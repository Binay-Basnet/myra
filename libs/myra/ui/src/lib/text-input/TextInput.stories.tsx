import { Meta,Story } from '@storybook/react';

import { TextInput, TextInputProps } from './TextInput';

export default {
  component: TextInput,
  title: 'form/TextInput',
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
