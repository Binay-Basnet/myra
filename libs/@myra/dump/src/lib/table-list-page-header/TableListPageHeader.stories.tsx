import { Meta, Story } from '@storybook/react';

import { TableListPageHeader, TableListPageHeaderProps } from './TableListPageHeader';

export default {
  component: TableListPageHeader,
  title: 'Old Dump /TableListPageHeader',
} as Meta;

const Template: Story<TableListPageHeaderProps> = (args) => <TableListPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
