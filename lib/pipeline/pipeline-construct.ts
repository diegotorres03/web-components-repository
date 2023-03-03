import {
    Stack,
    StackProps,
    aws_s3 as S3,
    aws_codeartifact as CodeArtifact,
    aws_codepipeline as CodePipeline,
    aws_codecommit as CodeCommit,
    aws_codepipeline_actions as CodePipelineActions,
    aws_codebuild as CodeBuild,
    CfnOutput,
    RemovalPolicy,
    Duration,
} from 'aws-cdk-lib'
import { count } from 'console'
import { Construct } from 'constructs'

const { log, warn, error } = console

let buildCount = 0

export class PipeConstruct extends Construct {

    pipeline: CodePipeline.Pipeline
    sourceOutput: CodePipeline.Artifact

    constructor(scope: Construct, id: string) {
        super(scope, id)

        // [ ] example of every step



        // [ ] create pipeline
        // [ ] build
        // [ ] deploy
        // [ ] artifact repo

        this.pipeline = new CodePipeline.Pipeline(this, 'pipeline', {
            crossAccountKeys: false,
        })


    }

    /**
     * create a domain
     * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codeartifact-domain.html
     *
     * @param {string} domainName A string that specifies the name of the requested domain. 
     * @memberof PipeConstruct
     */
    createArtifactDomain(domainName: string) {
        const domain = new CodeArtifact.CfnDomain(this, 'artifact-domain', {
            domainName,
        })
        return domain
    }

    createArtifactRepository(domainName: string, repositoryName: string) {
        const artifactRepo = new CodeArtifact.CfnRepository(this, 'artifact-repo', {
            domainName,
            repositoryName,
            // upstreams: [''],
        })
        return artifactRepo
    }

    getBuildCount() {
        return buildCount++
    }


    createCodeRepository(name: string, path?: string) {
        // [ ] create repo
        const codeRepo = new CodeCommit.Repository(this, name, {
            repositoryName: 'web-components-library',
            description: 'public web component repository, usefull for quick PoCs',
            code: path ? CodeCommit.Code.fromDirectory(path) : undefined,
        })

        new CfnOutput(this, 'codeRepoSSH', { value: codeRepo.repositoryCloneUrlSsh, })
        new CfnOutput(this, 'codeRepoHTTPS', { value: codeRepo.repositoryCloneUrlHttp, })
        return codeRepo
    }


    source(codeRepo: CodeCommit.Repository, branch = 'main') {
        this.sourceOutput = new CodePipeline.Artifact()
        const sourceAction = new CodePipelineActions.CodeCommitSourceAction({
            actionName: 'CodeCommit',
            repository: codeRepo,
            output: this.sourceOutput,
            branch,
        })


        const sourceStage = this.pipeline.addStage({ stageName: 'Source' })
        sourceStage.addAction(sourceAction)

        return this
    }

    build(buildSpecJson: any, options?: {
        s3Bucket: S3.Bucket,
        path?: string,
    }) {
        // https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html
        const count = this.getBuildCount()

        const buildProjectParams = {
            buildSpec: CodeBuild.BuildSpec.fromObject(buildSpecJson),
        }

        if (options && options.s3Bucket) {
            buildProjectParams['artifacts'] = CodeBuild.Artifacts.s3({
                bucket: options.s3Bucket,
                // packageZip: false,
                // path: options.path || undefined,
            })
        }

        const buildProject = new CodeBuild.Project(this, 'Build-project-' + count, buildProjectParams)


        const buildStage = this.pipeline.addStage({ stageName: 'Build-' + count })
        buildStage.addAction(new CodePipelineActions.CodeBuildAction({
            actionName: 'CodeBuild',
            project: buildProject,
            input: this.sourceOutput,
            outputs: [new CodePipeline.Artifact()],
        }))


        return this
    }

    deploy(target: any) {
        return this
    }


    /**
     * this is one possible strategy
     *
     * @param {number} [retyCount=2]
     * @return {*} 
     * @memberof PipeConstruct
     */
    retry(retyCount: number = 2) {
        return this
    }

    /**
     * use it to make an step optional
     * @since 11/19/2022
     * @param {Function} [handler]
     * @return {*} 
     * @memberof PipeConstruct
     */
    skip(handler?: Function) {
        return this
    }

    catch(handler: Function) {
        // here do whatever you can imaging 
        // feel free to push the boundaries and shar it back witn the community
        return this
    }
}