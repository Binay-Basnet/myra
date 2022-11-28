import { Meta, Story } from '@storybook/react';

import { Navbarfordaashboard, NavbarfordaashboardProps } from './Navbarfordaashboard';

export default {
  component: Navbarfordaashboard,
  title: 'Old Dump /Navbarfordaashboard',
} as Meta;

const Template: Story<NavbarfordaashboardProps> = (args) => <Navbarfordaashboard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
