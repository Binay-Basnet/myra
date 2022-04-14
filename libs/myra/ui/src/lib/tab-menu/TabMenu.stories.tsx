import { Story, Meta } from '@storybook/react';
import { TabMenu, TabMenuProps } from './TabMenu';

export default {
  component: TabMenu,
  title: 'TabMenu',
} as Meta;

const Template: Story<TabMenuProps> = (args) => <TabMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
