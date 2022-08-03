import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { RadioButton, RadioButtonProps } from './RadioButton';

export default {
  component: RadioButton,
  title: 'radio/RadioButton',
  argTypes: getThemingArgTypes(theme as Theme, 'Radio'),
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  spacing: '8px',
  children: 'Label',
  isDisabled: false,
};
