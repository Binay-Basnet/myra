import { Story, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: Avatar,
  title: 'Atoms/Avatar',
  argTypes: getThemingArgTypes(theme as Theme, 'Avatar'),
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  name: 'John Doe',
  border: '1px solid gray.0',
};
