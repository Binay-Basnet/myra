import { CgLoadbarDoc } from 'react-icons/cg';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SettingsButton } from './SettingsButton';

const Story: ComponentMeta<typeof SettingsButton> = {
  component: SettingsButton,
  title: 'Myra Design System / Components / Navigations / Settings Button',
};
export default Story;

const Template: ComponentStory<typeof SettingsButton> = (args) => <SettingsButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: CgLoadbarDoc,
  buttonLabel: 'Reports',
};
