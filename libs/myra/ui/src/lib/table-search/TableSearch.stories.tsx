import { Story, Meta } from '@storybook/react';
import { TableSearch, TableSearchProps } from './TableSearch';

export default {
  component: TableSearch,
  title: 'TableSearch',
} as Meta;

const Template: Story<TableSearchProps> = (args) => <TableSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
