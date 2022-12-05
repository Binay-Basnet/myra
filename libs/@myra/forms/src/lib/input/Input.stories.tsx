import { Meta, Story } from '@storybook/react';

import { Input, InputProps } from './Input';

export default {
  title: 'Myra Design System / Forms / Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary: Story<InputProps> = Template.bind({});

Primary.args = {
  label: 'Input',
  helperText: 'This is a input',
};
