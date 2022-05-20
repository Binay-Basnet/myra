import { Story, Meta } from '@storybook/react';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { AddIcon } from '@chakra-ui/icons';

export default {
  component: CheckboxGroup,
  title: 'checkbox/CheckboxGroup',
  argTypes: getThemingArgTypes(theme as Theme, 'Checkbox'),
} as Meta;

const Template: Story<CheckboxGroupProps> = (args) => (
  <CheckboxGroup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: 'sm',
  isDisabled: false,
  isInvalid: false,
  spacing: 4,
  direction: 'row',
  checkList: ['Label 1', 'Label 2', 'Label 3'],
  variant: 'simple',
  // icon: <AddIcon />,
  // iconColor: 'white.400',
};
