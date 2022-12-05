import { Meta, Story } from '@storybook/react';

import { FormHeader, FormHeaderProps } from './FormHeader';

export default {
  component: FormHeader,
  title: 'Myra Design System / Templates / Form / FormHeader',
} as Meta;

const Template: Story<FormHeaderProps> = (args) => <FormHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'New Product',
  buttonLabel: 'Add Product',
  buttonHandler: () => null,
};
