import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MainLayout } from './MainLayout';

const Story: ComponentMeta<typeof MainLayout> = {
  component: MainLayout,
  title: 'MainLayout',
};
export default Story;

const Template: ComponentStory<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
