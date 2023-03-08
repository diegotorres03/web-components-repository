#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebComponentsRepositoryStack } from '../lib/web-components-repository-stack';
import { WebComponentsPipelineStack } from '../lib/pipeline-stack'
const app = new cdk.App()


const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAUL_REGION || 'us-east-2',
}


new WebComponentsPipelineStack(app, 'webComponentsRepoPilepine', { env })


new WebComponentsRepositoryStack(app, 'wc-stage', { env })
