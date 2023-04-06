import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { WebAppConstruct } from 'dt-cdk-lib'

export class WebDevConStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const webapp = new WebAppConstruct(this, 'WebDevConLib')
    webapp
      .run('./web-components', 'npm i')
      .run('./web-components', 'npm run build')
      .addAssets('./web-components/dist')

  }
}

