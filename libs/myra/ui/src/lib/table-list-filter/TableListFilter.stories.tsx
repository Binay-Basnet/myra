import { Story, Meta } from '@storybook/react';
import { TableListFilter, TableListFilterProps } from './TableListFilter';

export default {
  component: TableListFilter,
  title: 'TableListFilter',
} as Meta;

const Template: Story<TableListFilterProps> = (args) => (
  <TableListFilter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
