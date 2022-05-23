import { Story, Meta } from '@storybook/react';
import { TableAmountFilter, TableAmountFilterProps } from './TableAmountFilter';

export default {
  component: TableAmountFilter,
  title: 'TableAmountFilter',
} as Meta;

const Template: Story<TableAmountFilterProps> = (args) => (
  <TableAmountFilter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
