import { Tabs } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { SidebarTabs, SidebarTabsProps } from './SidebarTabs';

export default {
  component: SidebarTabs,
  title: 'Myra Design System / Components / Navigations / Sidebar Tabs',
} as Meta;

const Template: Story<SidebarTabsProps> = (args) => (
  <Tabs>
    <SidebarTabs {...args} />{' '}
  </Tabs>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Hello',
  to: '/',
};
