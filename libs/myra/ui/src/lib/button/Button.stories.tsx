import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { BiArrowBack } from 'react-icons/bi';

export default {
  component: Button,
  title: 'form/Button',
  argTypes: getThemingArgTypes(theme as Theme, 'Button'),
} as Meta;

// type StoryProps = ThemingProps<'Button'>;

const Template: StoryFn<ButtonProps> = (props) => (
  <Button {...props}> {props.children} </Button>
);

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  leftIcon: <BiArrowBack />,
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',
  colorScheme: 'primary',
};
export const Danger = Template.bind({});
Danger.args = {
  size: 'md',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',
  colorScheme: 'danger',
};
export const Neutral = Template.bind({});
Neutral.args = {
  size: 'md',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',
  colorScheme: 'blackAlpha',
};
