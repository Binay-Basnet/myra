import { Story, Meta } from '@storybook/react';
import { IconButton, IconButtonProps } from './IconButton';
import { AiOutlineAppstore } from 'react-icons/ai';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: IconButton,
  title: 'IconButton',
  argTypes: getThemingArgTypes(theme as Theme, 'Button'),
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <AiOutlineAppstore />,
};
