import {
    Stack,
    StackProps,
    aws_s3 as S3,
    aws_s3_deployment as S3Deployment,
    // aws_cloudfront as CloudFront,
    aws_cloudfront_origins as CloudFrontOrigins,
    aws_route53 as Route53,
    aws_lambda as Lambda,
    aws_certificatemanager as ACM,
    aws_iam as IAM,
    CfnOutput,
    RemovalPolicy,
} from 'aws-cdk-lib'
import * as CloudFront from 'aws-cdk-lib/aws-cloudfront'
import { Construct } from 'constructs'
import { exec, execSync } from 'child_process'




export class WebAppConstruct extends Construct {
    private webappBucket: S3.Bucket
    constructor(scope: Construct, id: string) {
        super(scope, id)



        // const customLambda = new Lambda.Function(this, 'custom-lambda', {
        //     runtime: Lambda.Runtime.PROVIDED,
        //     handler: 'index.handler',
        //     // code 
        // })

        // [ ] 1.1.1: create S3 Bucket as web hosting to store webapp [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-s3-readme.html)
        this.webappBucket = new S3.Bucket(this, 'webapp-artifact', {
            accessControl: S3.BucketAccessControl.PRIVATE,
            cors: [{
                allowedMethods: [S3.HttpMethods.GET],
                allowedOrigins: ['*'],

                // the properties below are optional
                allowedHeaders: ['Authorization'],
                exposedHeaders: [],
            }],
            removalPolicy: RemovalPolicy.DESTROY,
        })

        new CfnOutput(this, 'webappBucketName', {
            value: this.webappBucket.bucketName,
        })
        // exportName: 'webappBucketName'


        // [ ] 1.3.1: create Route 53 record set [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-route53-readme.html)
        // const domainName = props?.domainName || `${Date.now()}.diegotrs.com`

        // const hostedZone = new Route53.HostedZone(this, 'hoztedZone', { zoneName: domainName })

        // const cert = new ACM.DnsValidatedCertificate(this, 'webapp-cert', { 
        //     domainName: domainName, 
        //     hostedZone, 

        // })
        // const record


        // [ ] 1.2.1: create CloudFront distribution [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudfront-readme.html)
        const originAccessIdentity = new CloudFront.OriginAccessIdentity(this, 'OriginAccessIdentity')

        // allow clowdfront to read s3 webpp files
        this.webappBucket.grantRead(originAccessIdentity)

        const cdnDistribution = new CloudFront.Distribution(this, 'WebappDistribution', {
            defaultRootObject: 'index.html',

            defaultBehavior: {
                origin: new CloudFrontOrigins.S3Origin(this.webappBucket, {
                    originAccessIdentity,

                }),
                originRequestPolicy: CloudFront.OriginRequestPolicy.CORS_S3_ORIGIN,


            },

            // certificate: cert,
            // domainNames: [domainName]
        })

        new CfnOutput(this, 'webappDnsUrl', {
            value: cdnDistribution.distributionDomainName,
        })
        // exportName: 'webappDnsUrl'

        new CfnOutput(this, 'distributionId', {
            value: cdnDistribution.distributionId,
        })
        // exportName: 'distributionId'


    }

    addAssets(path: string, destinationPath?: string) {
        const webappDeployment = new S3Deployment.BucketDeployment(this, 'deployStaticWebapp', {
            sources: [S3Deployment.Source.asset(path)],
            destinationBucket: this.webappBucket,
            destinationKeyPrefix: destinationPath ? destinationPath : undefined,
        })

        return this
    }
    run(path: string, commands: string | string[]) {
        const cmds = Array.isArray(commands) ? commands : [commands]
        console.log('111111111111111111111111111111111111111111111111111111111')
        console.log('111111111111111111111111111111111111111111111111111111111')
        for (let cmd of cmds) {
            const res = execSync(cmd, {
                cwd: path,
                stdio: [0, 1, 2]
            })
            console.log(res)
        }
        console.log('111111111111111111111111111111111111111111111111111111111')
        console.log('111111111111111111111111111111111111111111111111111111111')
        return this
    }

}
