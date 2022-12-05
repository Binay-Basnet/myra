import { Meta, Story } from '@storybook/react';

import { TextAreaInput, TextAreaInputProps } from './TextAreaInput';

export default {
  component: TextAreaInput,
  title: 'Myra Design System / Forms / Text Area Input',
} as Meta;

const Template: Story<TextAreaInputProps> = (args) => <TextAreaInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
