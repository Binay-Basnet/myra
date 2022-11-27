import { Meta, Story } from '@storybook/react';

import { TextAreaInput, TextAreaInputProps } from './TextAreaInput';

export default {
  component: TextAreaInput,
  title: 'Old Dump /form/TextAreaInput',
} as Meta;

const Template: Story<TextAreaInputProps> = (args) => <TextAreaInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
