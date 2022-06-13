import { Meta, Story } from '@storybook/react';

import { FormInput, FormInputProps } from './FormInput';

export default {
  component: FormInput,
  title: 'form/FormInput',
} as Meta;

const Template: Story<FormInputProps> = (args) => <FormInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  leftElement: <span>{'<'}</span>,
  rightElement: <span>{'>'}</span>,
  textHelper: 'Fill this field',
  textError: 'Error',
  placeholder: 'Placeholder',
  label: 'Label',
};
