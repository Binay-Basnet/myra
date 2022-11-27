import { Meta, Story } from '@storybook/react';

import { FormAccountSelect } from './FormAccountSelect';

export default {
  component: FormAccountSelect,
  title: 'Old Dump /FormAccountSelect',
} as Meta;

const Template: Story<any> = (args) => <FormAccountSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
