// Note, require 
// https://aws.amazon.com/blogs/mobile/building-scalable-graphql-apis-on-aws-with-cdk-and-aws-appsync/
import {
  Stack, StackProps,
  aws_appsync as AppSync,
  aws_ec2 as EC2,
  aws_iam as IAM,
  aws_lambda as Lambda,
  CfnOutput,
  Duration,
} from 'aws-cdk-lib'
// import * as AppSync from '@aws-cdk/aws-appsync'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { promises as fs } from 'fs'

const { log } = console

import { ApiBuilderConstruct } from '../rest-api/api-builder-construct'

const getHandlerFromInlineFn = (fn: Function) => {
  const functionCodeStr = fn.toString()
  let code

  if (functionCodeStr.includes('exports.handler = ')) {
    code = `(${functionCodeStr})()`
  } else {
    code = `(function() {
            exports.handler = ${functionCodeStr}
        })()`
    log(code)
  }
  return code
}

const next = (resolverParams: any, run: Function) => ({
  requestMapping(mappingTemplate: string) {
    resolverParams['requestMappingTemplate'] = mappingTemplate
    log(mappingTemplate)
    return this
  },
  responseMapping(mappingTemplate: string) {
    resolverParams['responseMappingTemplate'] = mappingTemplate
    log(mappingTemplate)
    return this
  },
  end() {
    log(resolverParams)
    return run(resolverParams)
  }
})


// const output = 

export class GraphQLConstruct extends Construct {

  private api: AppSync.CfnGraphQLApi

  private httpDataSource: AppSync.CfnDataSource

  private http = (type: string, fieldName: string, apiId: string) => (endpoint: { url: string, method?: string }) => {
    log(endpoint)

    this.httpDataSource = new AppSync.CfnDataSource(this, `http-data-source-${type}-${fieldName}`, {
      apiId: apiId,
      name: `httpDataSource_${type}_${fieldName}`,
      type: 'HTTP',
      httpConfig: {
        // authorizationConfig: {
        //     authorizationType: 'AWS_IAM'
        // },
        endpoint: endpoint.url,

      },

    })


    return next({}, (params: any) => {
      const resolverParams = {
        apiId,
        typeName: type,
        fieldName,
        dataSourceName: this.httpDataSource.name,
        requestMappingTemplate: params.requestMappingTemplate,
        responseMappingTemplate: params.responseMappingTemplate,

      } as AppSync.CfnResolverProps
      console.table(resolverParams)
      const resolver = new AppSync.CfnResolver(this, `resolver-${type}-${fieldName}`, resolverParams)
      resolver.addDependsOn(this.httpDataSource)

      new AppSync.CfnResolver(this, `resolver-${type}-${fieldName}`, resolverParams)

    })

  }


  private fn = (type: string, fieldName: string, apiId: string) => (inlineFn: Function, options?: any) => {
    const lambda = this.createLambda(inlineFn, options)

    const { invokeLambdaRole } = this.createLambdaRole(lambda, options)

    const dataSource = new AppSync.CfnDataSource(this, `gql-data-source-${type}-${fieldName}`, {
      apiId: apiId,
      name: `notesLambda_${type}_${fieldName}`,
      type: 'AWS_LAMBDA',
      lambdaConfig: { lambdaFunctionArn: lambda.functionArn },
      serviceRoleArn: invokeLambdaRole.roleArn, // este me falto
    })




    return next({ lambda }, (params: any) => {
      const resolver = new AppSync.CfnResolver(this, 'resolver-' + fieldName, {
        apiId: apiId,
        typeName: type,
        fieldName: fieldName,
        dataSourceName: dataSource.name,
        requestMappingTemplate: params.requestMappingTemplate,
        responseMappingTemplate: params.responseMappingTemplate,
      })
      resolver.addDependsOn(dataSource)
    })
  }

  constructor(scope: Construct, id: string, props?: StackProps) {
    // @ts-ignore
    super(scope, id, props)
  }

  async createApi( name: string, schemaPath: string) {

    this.api = new AppSync.CfnGraphQLApi(this, 'gql-api', {
      name: name,
      authenticationType: 'API_KEY', //  API_KEY, AWS_IAM, AMAZON_COGNITO_USER_POOLS, OPENID_CONNECT, or AWS_LAMBDA
      xrayEnabled: true,
      // logConfig: {}
    })

    const schema = new AppSync.CfnGraphQLSchema(this, 'gql-api-schema', {
      apiId: this.api.attrApiId,
      definition: (await fs.readFile(schemaPath)).toString(),
    })

    new CfnOutput(this, `gql-api-id`, { value: this.api.attrApiId })
    new CfnOutput(this, `gql-api-url`, { value: this.api.attrGraphQlUrl })

  }

  /**
   * original location api-builder.ts
   * @author Diego Torres <diegotorres@easyarchery.net>
   * @version 1.0.0
   * @param {LambdaDef} LambdaDef 
   * @returns 
   */
  createLambda(functionCode: Function, options: {
    name: string, env: any, access: Function[], vpc: EC2.Vpc, securityGroupIds: string[]
  }) {
    if (!options.name) throw new Error('name is required')

    let vpc
    let sgs
    if (options.vpc) {
      vpc = options.vpc as EC2.Vpc
      sgs = [EC2.SecurityGroup.fromLookupByName(this, 'defaultSG-' + options.name, 'default', options.vpc)]
      //  sgs = Array.isArray(options.securityGroupIds) ? options.securityGroupIds
      //     .map(sgId => EC2.SecurityGroup.fromSecurityGroupId(this, 'sgid', sgId)) : []
      // log('sgids', options.securityGroupIds)
      // log(sgs)
    }


    const functionCodeStr = functionCode.toString()
    let code

    if (functionCodeStr.includes('exports.handler = ')) {
      // log('full function')
      code = `(${functionCodeStr})()`
    } else {
      // log('handler function')
      code = `(function() {
                exports.handler = ${functionCodeStr}
            })()`
    }

    const lambdaParams = {
      runtime: Lambda.Runtime.NODEJS_16_X,
      code: Lambda.Code.fromInline(code),
      timeout: Duration.minutes(1),
      // code: Lambda.Code.fromAsset(lambdaDef.path),
      allowPublicSubnet: vpc ? true : undefined,
      securityGroups: sgs,
      handler: 'index.handler',
      vpc,
      environment: { ...options.env }
    }


    // log('\n\nlambda params')
    // log(lambdaParams)

    const lambda = new Lambda.Function(this, options.name, lambdaParams)

    new CfnOutput(this, `${options.name}-lambda-arn`, { value: lambda.functionArn })


    if (options && Array.isArray(options.access)) {
      options.access.forEach(fn => fn(lambda))
    }

    return lambda
  }

  createLambdaRole(lambda: Lambda.Function, options?) {
    const involeLambdaPolicy = new IAM.PolicyDocument({
      statements: [
        new IAM.PolicyStatement({
          effect: IAM.Effect.ALLOW,
          actions: ['lambda:InvokeFunction'],
          resources: [lambda.functionArn],
        }),
      ],
    })

    const invokeLambdaRole = new IAM.Role(this, `invokeLambdaRole-${options.name}}`, {
      assumedBy: new IAM.ServicePrincipal('appsync.amazonaws.com'),
      inlinePolicies: {
        InvokeLambda: involeLambdaPolicy,
      },
    })
    return { invokeLambdaRole, involeLambdaPolicy }
  }



  mutation(fieldName: string) {
    return {
      fn: this.fn('Mutation', fieldName, this.api.attrApiId),
      // http, dynamo,
    }
  }


  query(fieldName: string) {
    const type = 'Query'

    const dynamo = (tableName: string) => {
      return next({ tableName }, (params: any) => { })
    }

    const pipe = (pipeContext: any = {}) => {
      const apiId = this.api.attrApiId
      const steps = [] as { lambda: Lambda.Function, invokeLambdaRole: IAM.Role, dataSource: AppSync.CfnDataSource }[]
      const handlers = {
        fn: (inlineFn: Function, options?: any) => {
          const lambda = this.createLambda(inlineFn, options)

          const { invokeLambdaRole } = this.createLambdaRole(lambda, options)

          const dataSource = new AppSync.CfnDataSource(this, `gql-data-source-${options.name}`, {
            apiId: apiId,
            name: `notesLambda_${options.name.replace(/[-]/g,'_')}`,
            type: 'AWS_LAMBDA',
            lambdaConfig: { lambdaFunctionArn: lambda.functionArn },
            serviceRoleArn: invokeLambdaRole.roleArn, // este me falto
          })

          if (!pipeContext.lambdas) pipeContext.lambdas = []
          steps.push({ lambda, invokeLambdaRole, dataSource })
          return handlers
        },

        html: () => { },
        dynamo: () => { },
        end: () => {



          // [x] make a AWS::AppSync::FunctionConfiguration for every step (lambdas)
          const fnName = `pipe_query_${fieldName}_config`
          const fns = steps.map((step, index) => {
            const fnConfig = new AppSync.CfnFunctionConfiguration(this, `${fnName}_${index}`, {
              name: `${fnName}_${index}`,
              apiId,
              dataSourceName: step.dataSource.name,
              functionVersion: '2018-05-29',
              requestMappingTemplate: `#**
              The value of 'payload' after the template has been evaluated
              will be passed as the event to AWS Lambda.
              *#
              {
                  "operation": "Invoke",
                  "payload": $util.toJson($context.arguments)
              }`,
              responseMappingTemplate: `## Raise a GraphQL field error in case of a datasource invocation error
              #if($ctx.error)
                $util.error($ctx.error.message, $ctx.error.type)
              #end
              
              $util.toJson($context.result)`,
            })
            fnConfig.addDependsOn(step.dataSource)
            // step.dataSource.addDependsOn(fnConfig)
            return fnConfig
          })

          // [ ] create AWS::AppSync::Resolver with pipeline config
          const resolver = new AppSync.CfnResolver(this, 'pipe-resolver-' + fieldName, {
            apiId,
            typeName: type,
            fieldName,
            kind: 'PIPELINE',
            requestMappingTemplate: `{}`,
            responseMappingTemplate: `$util.toJson($ctx.result)`,
            pipelineConfig: {
              functions: fns.map(fn => fn.attrFunctionId)
            }
          })

          steps.forEach(step => resolver.addDependsOn(step.dataSource))
        }
      }
      return handlers
    }

    return {
      fn: this.fn(type, fieldName, this.api.attrApiId),
      http: this.http(type, fieldName, this.api.attrApiId),
      dynamo,
      pipe,
    }
  }

  subscription(fieldName: string) {
    const apiId = this.api.attrApiId
    const type = 'Subscription'
    const nextSteps = {
      setFilter: (mappingTemplate) => {
        const localDataSource = new AppSync.CfnDataSource(this, `local-datasource-${fieldName}-${type}`, {
          apiId,
          name: 'Local',
          type: 'NONE',
        })

        const resolverParams = {
          apiId,
          fieldName,
          typeName: type,
          kind: 'UNIT',
          dataSourceName: localDataSource.name,
          responseMappingTemplate: mappingTemplate,
          requestMappingTemplate: `
            #**
            Resolvers with None data sources can locally publish events that fire
            subscriptions or otherwise transform data without hitting a backend data source.
            The value of 'payload' is forwarded to $ctx.result in the response mapping template.
            *#
            {
                "version": "2017-02-28",
                "payload": {
                    "hello": "local",
                }
            }`
        } as AppSync.CfnResolverProps


        const resolver = new AppSync.CfnResolver(this, `filter-resolver-${fieldName}-${type}`, resolverParams)
        resolver.addDependsOn(localDataSource)

      }
    }
    return nextSteps
  }

}


