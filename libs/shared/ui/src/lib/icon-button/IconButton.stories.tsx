import { AiOutlineAppstore } from 'react-icons/ai';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { IconButton, IconButtonProps } from './IconButton';

export default {
  component: IconButton,
  title: 'Atoms/IconButton',
  argTypes: getThemingArgTypes(theme as Theme, 'Button'),
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <AiOutlineAppstore />,
  size: 'md',
  fontSize: '24px',
};
