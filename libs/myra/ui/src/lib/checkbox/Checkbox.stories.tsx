import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { theme } from '@saccos/myra/util';
import { Meta,Story } from '@storybook/react';

import { Checkbox, CheckboxProps } from './Checkbox';
// import { AddIcon } from '@chakra-ui/icons';

export default {
  component: Checkbox,
  title: 'checkbox/Checkbox',
  argTypes: getThemingArgTypes(theme as Theme, 'Checkbox'),
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'sm',
  spacing: '8px',
  children: 'Label',
  defaultChecked: false,
  isDisabled: false,
  isInvalid: false,
  // icon: <AddIcon />,
  // iconColor: 'white.400',
};
