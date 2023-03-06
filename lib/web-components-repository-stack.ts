import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { WebAppConstruct } from '../lib/webapp/webapp-construct'

export class WebComponentsRepositoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    webapp
      .run() // build comand
      .addAssets('./web-components')
      

    // [ ] pipeline to deploy this web components
    

  }
}


