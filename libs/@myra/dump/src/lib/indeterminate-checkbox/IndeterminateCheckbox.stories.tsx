import { AddIcon } from '@chakra-ui/icons';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { IndeterminateCheckbox, IndeterminateCheckboxProps } from './IndeterminateCheckbox';

export default {
  component: IndeterminateCheckbox,
  title: 'Old Dump /checkbox/IndeterminateCheckbox',
  argTypes: getThemingArgTypes(theme as Theme, 'Checkbox'),
} as Meta;

const Template: Story<IndeterminateCheckboxProps> = (args) => <IndeterminateCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  mt: 1,
  pl: 6,
  children: 'Parent',
  size: 'md',
  colorScheme: 'cyan',
  isDisabled: false,
  isInvalid: false,
  spacing: 4,
  direction: 'row',
  checkList: ['Children 1', 'Children 2', 'Children 3'],
  icon: <AddIcon />,
  iconColor: 'white.400',
  isIndeterminate: true,
};
