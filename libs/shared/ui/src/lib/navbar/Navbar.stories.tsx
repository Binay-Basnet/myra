import { Meta, Story } from '@storybook/react';

import { MyraUiNavbarProps, Navbar } from './Navbar';

export default {
  component: Navbar,
  title: 'Navbar',
} as Meta;

const Template: Story<MyraUiNavbarProps> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
