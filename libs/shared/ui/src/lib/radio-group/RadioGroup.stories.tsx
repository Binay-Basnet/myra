import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { RadioGroup, RadioGroupProps } from './RadioGroup';

export default {
  component: RadioGroup,
  title: 'radio/RadioGroup',
  argTypes: getThemingArgTypes(theme as Theme, 'Radio'),
} as Meta;

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  colorScheme: 'cyan',
  isDisabled: false,
  spacing: 4,
  direction: 'row',
  radioList: ['Value 1', 'Value 2', 'Value 3'],
};
