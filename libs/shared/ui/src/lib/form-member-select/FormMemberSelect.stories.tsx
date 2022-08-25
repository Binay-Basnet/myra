import { Meta, Story } from '@storybook/react';

import { FormMemberSelect, FormMemberSelectProps } from './FormMemberSelect';

export default {
  component: FormMemberSelect,
  title: 'FormMemberSelect',
} as Meta;

const Template: Story<FormMemberSelectProps> = (args) => (
  <FormMemberSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
