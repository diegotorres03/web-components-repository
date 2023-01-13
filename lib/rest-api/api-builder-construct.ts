import {
    Stack, StackProps,
    aws_apigateway as ApiGateway,
    aws_ec2 as EC2,
    aws_iam as IAM,
    aws_dynamodb as DynamoDB,
    aws_lambda as Lambda,
    aws_s3 as S3,
    aws_s3_deployment as S3Deployment,
    RemovalPolicy,
    CfnOutput,
    Duration
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';


/**
 * @typedef {Object} LambdaDef
 * @property {string} path - path to code 
 * @property {handler} handler - file and method name, like index.handle 
 * @property {Object} env - environment variables 
 */

interface LambdaDef {
    runtime?: Lambda.Runtime
    path: string
    handler?: string
    env?: any
    name?: string
}

export class ApiBuilderConstruct extends Construct {

    // private codeBucket: S3.bucket

    constructor(scope: Construct, id: string) {
        super(scope, id)
    }


    createApi(apiName: string) {
        let method = null
        let path = null
        const api = new ApiGateway.RestApi(this, apiName, {
            deployOptions: { stageName: process.env.STAGE || 'dev' },
            defaultCorsPreflightOptions: {
                allowOrigins: ApiGateway.Cors.ALL_ORIGINS,
                allowMethods: ApiGateway.Cors.ALL_METHODS,
                allowHeaders: [
                    'Content-type', 'X-Amz-Date', 'X-Api-Key', 'Authorization',
                    'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods',
                ],
                allowCredentials: true,
            },
        })


        const apiUrl = new CfnOutput(this, 'apiUrl', { value: api.url })

        const requestHandler = (method: string) => (path: string, lambdaCode: Function, options: any) => {


            const lambda = this.createLambda(lambdaCode, options)

            if (Array.isArray(options.layers))
                options.layers.forEach((layer: Lambda.LayerVersion) => lambda.addLayers(layer))

            api.root.resourceForPath(path)
                // api.root.addResource(path)
                .addMethod(method,
                    new ApiGateway.LambdaIntegration(lambda, { proxy: true }))
        }

        const methods = {
            /**
             * 
             * @param {string} path - path on api, like users/{id}/profile 
             * @param {LambdaDef} lambdaDef 
             */
            post: requestHandler('POST'),

            get: requestHandler('GET'),

            delete: requestHandler('DELETE'),

            patch: requestHandler('PATCH'),

            put: requestHandler('PUT'),

        }
        return { api, ...methods }
    }

    /**
     * original location api-builder.ts
     * @author Diego Torres <diegotorres@easyarchery.net>
     * @version 1.0.0
     * @param {LambdaDef} LambdaDef 
     * @returns 
     */
    createLambda(functionCode: Function, options: {
        name: string,
        env: any,
        access: Function[],
        vpc: EC2.Vpc | string,
        securityGroupIds: string[],
        layers?: Lambda.ILayerVersion[]
    }) {
        if (!options.name) throw new Error('name is required')

        let vpc
        let sgs
        if (options.vpc) {
            vpc = options.vpc === 'default' ?
                EC2.Vpc.fromLookup(this, 'default-vpc-' + options.name, { isDefault: true }) :
                options.vpc as EC2.Vpc
            sgs = [EC2.SecurityGroup.fromLookupByName(this, 'defaultSG-' + options.name, 'default', vpc)]
            //  sgs = Array.isArray(options.securityGroupIds) ? options.securityGroupIds
            //     .map(sgId => EC2.SecurityGroup.fromSecurityGroupId(this, 'sgid', sgId)) : []
        }


        const functionCodeStr = functionCode.toString()
        let code

        if (functionCodeStr.includes('exports.handler = ')) {
            code = `(${functionCodeStr})()`
        } else {
            code = `(function() {
                exports.handler = ${functionCodeStr}
            })()`
        }

        const lambdaParams = {
            runtime: Lambda.Runtime.NODEJS_16_X,
            code: Lambda.Code.fromInline(code),
            timeout: Duration.minutes(1),
            // layers: Array.isArray(options.layers) ? [...options.layers] : [],
            // code: Lambda.Code.fromAsset(lambdaDef.path),
            allowPublicSubnet: vpc ? true : undefined,
            securityGroups: sgs,
            handler: 'index.handler',
            vpc,
            environment: { ...options.env }
        } as Lambda.FunctionProps



        const lambda = new Lambda.Function(this, options.name, lambdaParams)

        if (options && Array.isArray(options.access)) {
            options.access.forEach(fn => fn(lambda))
        }

        return lambda
    }

    createLayer(name: string, path: string) {
        const layer = new Lambda.LayerVersion(this, name, {
            removalPolicy: RemovalPolicy.DESTROY,
            code: Lambda.Code.fromAsset(path), // './layers/dax'
        })
        return layer
    }

}
