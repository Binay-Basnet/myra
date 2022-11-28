import { Meta, Story } from '@storybook/react';

import { TabMenuForInventoryApp, TabMenuForInventoryAppProps } from './TabMenuForInventoryApp';

export default {
  component: TabMenuForInventoryApp,
  title: 'Old Dump /TabMenuForInventoryApp',
} as Meta;

const Template: Story<TabMenuForInventoryAppProps> = (args) => <TabMenuForInventoryApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
