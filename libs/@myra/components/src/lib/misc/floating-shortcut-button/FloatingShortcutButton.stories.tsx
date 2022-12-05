import { Meta, Story } from '@storybook/react';

import { FloatingShortcutButton, FloatingShortcutButtonProps } from './FloatingShortcutButton';

export default {
  component: FloatingShortcutButton,
  title: 'Myra Design System / Components / Misc / Floating Button',
} as Meta;

const Template: Story<FloatingShortcutButtonProps> = (args) => <FloatingShortcutButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
