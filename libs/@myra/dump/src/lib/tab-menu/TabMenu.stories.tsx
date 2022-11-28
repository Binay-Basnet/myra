import { Meta, Story } from '@storybook/react';

import { TabMenu, TabMenuProps } from './TabMenu';

export default {
  component: TabMenu,
  title: 'Old Dump /TabMenu',
} as Meta;

const Template: Story<TabMenuProps> = (args) => <TabMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  t: {
    navbarDashboard: 'Dashboard',
    navbarMembers: 'Members',
    navbarShare: 'Share',
    navbarAccounts: 'Accounts',
    navbarTransactions: 'Transactions',
    navbarLoan: 'Loan',
    navbarReports: 'Reports',
    navbarUtilities: 'Utilities',
  },
};
