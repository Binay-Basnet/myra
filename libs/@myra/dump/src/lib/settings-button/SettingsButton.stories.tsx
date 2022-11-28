import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SettingsButton } from './SettingsButton';

const Story: ComponentMeta<typeof SettingsButton> = {
  component: SettingsButton,
  title: 'Old Dump /SettingsButton',
};
export default Story;

const Template: ComponentStory<typeof SettingsButton> = (args) => <SettingsButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
