import { Meta, Story } from '@storybook/react';

import { MainLayoutInventory, MainLayoutInventoryProps } from './MainLayoutInventory';

export default {
  component: MainLayoutInventory,
  title: 'Old Dump /MainLayoutInventory',
} as Meta;

const Template: Story<MainLayoutInventoryProps> = (args) => <MainLayoutInventory {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
