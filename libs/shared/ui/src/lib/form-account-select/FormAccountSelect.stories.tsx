import { Meta, Story } from '@storybook/react';

import {
  FormAccountSelect,
  FormAccountSelectProps,
} from './FormAccountSelecttest';

export default {
  component: FormAccountSelect,
  title: 'FormAccountSelect',
} as Meta;

const Template: Story<FormAccountSelectProps> = (args) => (
  <FormAccountSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
