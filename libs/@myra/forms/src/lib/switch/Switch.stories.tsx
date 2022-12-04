import { Meta, Story } from '@storybook/react';

import { Switch, SwitchProps } from './Switch';

export default {
  component: Switch,
  title: 'Myra Design System / Forms / Switch',
} as Meta;

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  isDisabled: false,
};
