import { Meta, Story } from '@storybook/react';

import { EmailInput, EmailInputProps } from './EmailInput';

export default {
  component: EmailInput,
  title: 'Old Dump /form/EmailInput',
} as Meta;

const Template: Story<EmailInputProps> = (args) => <EmailInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
