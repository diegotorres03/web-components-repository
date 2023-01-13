import { Stage, StageProps } from "aws-cdk-lib"
import { Construct } from "constructs"

import { WebComponentsRepositoryStack } from './web-components-repository-stack'





export class AppStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props)
        new WebComponentsRepositoryStack(this, 'WebComponentsRepositoryStack', { env: { ...props?.env } })
    }
}

