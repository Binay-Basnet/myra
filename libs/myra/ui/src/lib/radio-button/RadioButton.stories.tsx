import { Story, Meta } from '@storybook/react';
import { RadioButton, RadioButtonProps } from './RadioButton';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: RadioButton,
  title: 'radio/RadioButton',
  argTypes: getThemingArgTypes(theme as Theme, 'Radio'),
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  children: 'Radio',
  colorScheme: 'cyan',
  isDisabled: false,
  isInvalid: false,
};
