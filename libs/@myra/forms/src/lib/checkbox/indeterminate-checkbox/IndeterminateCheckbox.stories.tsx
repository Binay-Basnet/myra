import { AddIcon } from '@chakra-ui/icons';
import { Meta, Story } from '@storybook/react';

import { IndeterminateCheckbox, IndeterminateCheckboxProps } from './IndeterminateCheckbox';

export default {
  component: IndeterminateCheckbox,
  title: 'Myra Design System / Forms / Indeterminate Checkbox',
} as Meta;

const Template: Story<IndeterminateCheckboxProps> = (args) => <IndeterminateCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  mt: 1,
  pl: 6,
  children: 'Parent',
  size: 'md',
  colorScheme: 'primary',
  isDisabled: false,
  isInvalid: false,
  spacing: 4,
  direction: 'row',
  checkList: ['Children 1', 'Children 2', 'Children 3'],
  icon: <AddIcon />,
  iconColor: 'white.400',
  isIndeterminate: true,
};
