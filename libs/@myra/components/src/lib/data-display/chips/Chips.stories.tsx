import { Meta, Story } from '@storybook/react';

import { Chips, ChipsProps } from './Chips';

export default {
  component: Chips,
  title: 'Myra Design System / Components / Data Display / Chips',
} as Meta;

const Template: Story<ChipsProps> = (args) => <Chips {...args} />;

export const Chip = Template.bind({});
Chip.args = {
  theme: 'danger',
  variant: 'outline',
  size: 'sm',
  label: 'Test',
  type: 'avatar',
  avatar: 'https://bit.ly/sage-adebayo',
};
