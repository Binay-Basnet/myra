import { BiArrowBack } from 'react-icons/bi';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, StoryFn } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import Button, { ButtonProps } from './Button';

export default {
  component: Button,
  title: 'Old Dump /Atoms/Button',
  argTypes: getThemingArgTypes(theme as Theme, 'Button'),
} as Meta;

// type StoryProps = ThemingProps<'Button'>;

const Template: StoryFn<ButtonProps> = (props) => <Button {...props}> {props.children} </Button>;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  // mod: 'primary',
  leftIcon: <BiArrowBack />,
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',

  rightIcon: <BiArrowBack />,
  isDisabled: false,
  isActive: false,
};
export const Danger = Template.bind({});
Danger.args = {
  size: 'md',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',

  // mod: 'danger',
};
export const Neutral = Template.bind({});
Neutral.args = {
  size: 'md',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',

  // mod: 'netral',
};
