import React from "react";

import { makeDecorator } from '@storybook/addons';

import { ProvideMolecules } from "@bambooapp/bamboo-molecules"
import type {ReactNode} from "react";

export default makeDecorator({
  name: 'MoleculesProviderAddon',
  parameterName: "provideMolecules",
  wrapper: (storyFn, context) => {
    return (
        <ProvideMolecules>
          {storyFn(context) as ReactNode}
        </ProvideMolecules>
    );
  }
})