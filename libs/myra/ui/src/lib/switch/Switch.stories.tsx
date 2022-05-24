import { Story, Meta } from '@storybook/react';
import { Switch, SwitchProps } from './Switch';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: Switch,
  title: 'Switch',
  argTypes: getThemingArgTypes(theme as Theme, 'Switch'),
} as Meta;

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  isDisabled: false,
};
