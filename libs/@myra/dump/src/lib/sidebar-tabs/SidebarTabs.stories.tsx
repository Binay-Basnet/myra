import { Meta, Story } from '@storybook/react';

import { SidebarTabs, SidebarTabsProps } from './SidebarTabs';

export default {
  component: SidebarTabs,
  title: 'Old Dump /SidebarTabs',
} as Meta;

const Template: Story<SidebarTabsProps> = (args) => <SidebarTabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
