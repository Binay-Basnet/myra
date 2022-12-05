import { BiArrowBack } from 'react-icons/bi';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

const Story: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Myra Design System / Foundations / Button',
};

export default Story;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

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
  shade: 'danger',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',
};

export const Neutral = Template.bind({});
Neutral.args = {
  size: 'md',
  shade: 'neutral',
  isLoading: false,
  variant: 'solid',
  children: 'Button',
  loadingText: 'Loading...',
};
