import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MainLayoutInventory } from './MainLayoutInventory';

const Story: ComponentMeta<typeof MainLayoutInventory> = {
  component: MainLayoutInventory,
  title: 'MainLayoutInventory',
};
export default Story;

const Template: ComponentStory<typeof MainLayoutInventory> = (args) => (
  <MainLayoutInventory {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
