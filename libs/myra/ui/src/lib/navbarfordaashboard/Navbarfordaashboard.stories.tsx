import { Story, Meta } from '@storybook/react';
import {
  Navbarfordaashboard,
  NavbarfordaashboardProps,
} from './Navbarfordaashboard';

export default {
  component: Navbarfordaashboard,
  title: 'Navbarfordaashboard',
} as Meta;

const Template: Story<NavbarfordaashboardProps> = (args) => (
  <Navbarfordaashboard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
