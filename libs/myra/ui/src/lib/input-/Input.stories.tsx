import { Story, Meta } from '@storybook/react';
import { Input, InputProps } from './Input';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: Input,
  title: 'Atoms/Input',
  argTypes: getThemingArgTypes(theme as Theme, 'Input'),
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'filled',
  placeholder: 'Enter your name',
  focusBorderColor: 'red.500',
};
