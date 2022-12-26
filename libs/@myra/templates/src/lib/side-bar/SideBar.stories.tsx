import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SideBar } from './SideBar';

const Story: ComponentMeta<typeof SideBar> = {
  component: SideBar,
  title: 'SideBar',
};
export default Story;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
