import { Meta, Story } from '@storybook/react';

import { SettingsFooter, SettingsFooterProps } from './SettingsFooter';

export default {
  component: SettingsFooter,
  title: 'SettingsFooter',
} as Meta;

const Template: Story<SettingsFooterProps> = (args) => (
  <SettingsFooter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
