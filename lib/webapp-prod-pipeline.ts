import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { WebAppConstruct } from '../lib/webapp/webapp-construct'
import {} from './pipeline/pipeline-construct'

export class WebComponentsRepositoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    

    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    webapp
      .addAssets('./web-components')
      

    // [ ] pipeline to deploy this web components
    


  }
}


