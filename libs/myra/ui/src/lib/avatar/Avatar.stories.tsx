import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { theme } from '@coop/myra/util';
import { Meta, Story } from '@storybook/react';

import { Avatar, AvatarProps } from './Avatar';

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
