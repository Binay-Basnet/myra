import { Meta, Story } from '@storybook/react';

import { ShortcutTab, ShortcutTabProps } from './ShortcutTab';

export default {
  component: ShortcutTab,
  title: 'Old Dump /ShorcutTab',
} as Meta;

const Template: Story<ShortcutTabProps> = (args) => <ShortcutTab {...args} />;

export const Primary = Template.bind({});
Primary.args = { shortcut: 'Ctrl' };
