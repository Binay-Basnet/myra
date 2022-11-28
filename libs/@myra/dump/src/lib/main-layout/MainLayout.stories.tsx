import { Meta, Story } from '@storybook/react';

import { MainLayout, MainLayoutProps } from './MainLayout';

export default {
  component: MainLayout,
  title: 'Old Dump /MainLayout',
} as Meta;

const Template: Story<MainLayoutProps> = (args) => <MainLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
