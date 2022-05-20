import { Story, Meta } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { AddIcon } from '@chakra-ui/icons';

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
  children: 'Check 1',
  defaultChecked: false,
  isDisabled: false,
  isInvalid: false,
  colorScheme: 'green',
  // icon: <AddIcon />,
  // iconColor: 'white.400',
};
