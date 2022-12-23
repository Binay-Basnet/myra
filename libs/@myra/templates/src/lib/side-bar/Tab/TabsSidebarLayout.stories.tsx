import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TabColumn } from './TabsSidebarLayout';

const Story: ComponentMeta<typeof TabColumn> = {
  component: TabColumn,
  title: 'TabColumn',
};
export default Story;

const Template: ComponentStory<typeof TabColumn> = (args) => <TabColumn {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
