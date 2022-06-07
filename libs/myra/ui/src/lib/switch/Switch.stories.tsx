import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { theme } from '@coop/myra/util';
import { Meta, Story } from '@storybook/react';

import { Switch, SwitchProps } from './Switch';

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
