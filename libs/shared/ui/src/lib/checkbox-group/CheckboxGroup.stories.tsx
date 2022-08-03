import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

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
