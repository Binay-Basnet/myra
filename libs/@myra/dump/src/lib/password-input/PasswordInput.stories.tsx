import { Meta, Story } from '@storybook/react';

import { PasswordInput, PasswordInputProps } from './PasswordInput';

export default {
  component: PasswordInput,
  title: 'Old Dump /form/PasswordInput',
} as Meta;

const Template: Story<PasswordInputProps> = (args) => <PasswordInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
