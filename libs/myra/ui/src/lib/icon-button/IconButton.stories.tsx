import { AiOutlineAppstore } from 'react-icons/ai';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { theme } from '@coop/myra/util';
import { Meta, Story } from '@storybook/react';

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
