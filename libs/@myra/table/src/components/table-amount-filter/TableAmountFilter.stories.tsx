import { Meta, Story } from '@storybook/react';

import { TableAmountFilter } from './TableAmountFilter';

export default {
  component: TableAmountFilter,
  title: 'Myra Design System / Table / Table Amount Filter',
} as Meta;

const Template: Story = (args) => <TableAmountFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
