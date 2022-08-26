import { Meta, Story } from '@storybook/react';

import { Select } from './CustomSelect';

export default {
  component: Select,
  title: 'Select',
} as Meta;

const Template: Story = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
