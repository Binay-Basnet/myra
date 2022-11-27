import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { Input, InputProps } from './Input';

export default {
  component: Input,
  title: 'Old Dump /Atoms/Input',
  argTypes: getThemingArgTypes(theme as Theme, 'Input'),
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'outline',
  __placeholder: 'Enter your name',
  focusBorderColor: 'red.500',
  borderRadius: 'br2',
};
