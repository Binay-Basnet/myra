import { Meta, Story } from '@storybook/react';
import { TableListFilter } from './TableListFilter';

export default {
  component: TableListFilter,
  title: 'Table / TableListFilter',
} as Meta;

const Template: Story = (args) => <TableListFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
