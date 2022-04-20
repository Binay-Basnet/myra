import { Story, Meta } from '@storybook/react';
import { Navbar, MyraUiNavbarProps } from './Navbar';

export default {
  component: Navbar,
  title: 'Navbar',
} as Meta;

const Template: Story<MyraUiNavbarProps> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
