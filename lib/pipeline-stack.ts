import {
    CodePipeline,
    CodePipelineSource,
    ShellStep,
    CodeBuildStep,
    CodeCommitSourceOptions,
    Step,
} from 'aws-cdk-lib/pipelines'

import { Stack, StackProps } from 'aws-cdk-lib'
import * as CodeCommit from 'aws-cdk-lib/aws-codecommit'
import * as IAM from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs';
import { AppStage } from './pipeline-app-stage'




export class WebComponentsPipelineStack extends Stack {

    pipeline: CodePipeline

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)


        const codeRepo = CodeCommit.Repository.fromRepositoryName(this, 'webcomponents-repo', 'web-components-repository')

        this.pipeline = new CodePipeline(this, 'WebComponentRegistryPipeline', {
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.codeCommit(codeRepo, 'master'),
                commands: [
                    'npm ci',
                    'npm i -g aws-cdk',
                    'ls',
                    'pwd',
                    'cdk synth',
                    // 'git status',
                    // '',
                ],
                // primaryOutputDirectory: 'cdk.out',
            })
        })


        const appStep = new CodeBuildStep('appStep', {
            commands: [
                'ls',
                'pwd',
                'echo bulding',
                'echo hehe',

                // 'git status',
            ]
        })

        const codebuildRole = new IAM.Role(this, 'appStep-buildRole', {
            assumedBy: new IAM.ServicePrincipal('codebuild.amazonaws.com')
        })

        // codebuildRole.addToPolicy()

        this.pipeline.addStage(
            new AppStage(this, 'appStage', {...props}),
            {
                pre: Step.sequence([appStep])
            })

    }

}

