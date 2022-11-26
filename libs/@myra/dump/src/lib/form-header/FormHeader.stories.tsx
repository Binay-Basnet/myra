import { Meta, Story } from '@storybook/react';

import { FormHeader, FormHeaderProps } from './FormHeader';

export default {
  component: FormHeader,
  title: 'Old Dump /FormHeader',
} as Meta;

const Template: Story<FormHeaderProps> = (args) => <FormHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Old Dump /Hello World',
  buttonLabel: 'Add Product',
  buttonHandler: () => null,
};
