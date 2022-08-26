import { Meta, Story } from '@storybook/react';

import { FormCustomSelect, IFormCustomSelectProps } from './FormCustomSelect';

export default {
  component: FormCustomSelect,
  title: 'FormCustomSelect',
} as Meta;

const Template: Story<IFormCustomSelectProps> = (args) => (
  <FormCustomSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: '',
};
