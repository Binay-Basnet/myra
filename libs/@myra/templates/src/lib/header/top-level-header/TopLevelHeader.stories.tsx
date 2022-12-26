import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TopLevelHeader } from './TopLevelHeader';

const Story: ComponentMeta<typeof TopLevelHeader> = {
  component: TopLevelHeader,
  title: 'TopLevelHeader',
};
export default Story;

const Template: ComponentStory<typeof TopLevelHeader> = (args) => <TopLevelHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
