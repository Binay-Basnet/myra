import { Story, Meta } from '@storybook/react';
import { TextFields, TextFieldsProps } from './TextFields';

export default {
  component: TextFields,
  title: 'TextFields',
} as Meta;

const Template: Story<TextFieldsProps> = (args) => <TextFields {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'bodyLarge',
  children: 'Text Fields',
  bg: 'red.500',
};
export const Second = Template.bind({});
Second.args = {
  variant: 'bodyRegular',
  children: 'Text Fields',
  bg: 'red.500',
};
export const Third = Template.bind({});
Third.args = {
  variant: 'formLabel',
  children: 'Text Fields',
  bg: 'red.500',
};
export const Fourth = Template.bind({});
Fourth.args = {
  variant: 'formInput',
  children: 'Text Fields',
  bg: 'red.500',
};
export const Fifth = Template.bind({});
Fifth.args = {
  variant: 'formHelper',
  children: 'Text Fields',
  bg: 'red.500',
};
