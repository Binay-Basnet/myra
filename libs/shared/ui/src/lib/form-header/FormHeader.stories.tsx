import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { FormHeader, FormHeaderProps } from './FormHeader';

export default {
  component: FormHeader,
  title: 'FormHeader',
} as Meta;

const Template: Story<FormHeaderProps> = (args) => <FormHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Hello World',
};
