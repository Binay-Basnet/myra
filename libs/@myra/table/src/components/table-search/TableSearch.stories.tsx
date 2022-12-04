import { Meta, Story } from '@storybook/react';

import { TableSearch, TableSearchProps } from './TableSearch';

export default {
  component: TableSearch,
  title: 'Myra Design System / Table / Table Search',
} as Meta;

const Template: Story<TableSearchProps> = (args) => <TableSearch {...args} />;

export const Primary = Template.bind({});
Primary.args = { size: 'default' };
