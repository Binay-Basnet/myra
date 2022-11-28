import { Meta, Story } from '@storybook/react';

import { TableSearch, TableSearchProps } from './TableSearch';

export default {
  component: TableSearch,
  title: 'Old Dump /TableSearch',
} as Meta;

const Template: Story<TableSearchProps> = (args) => <TableSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
