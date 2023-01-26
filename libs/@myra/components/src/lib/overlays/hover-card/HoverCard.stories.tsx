import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { HoverCard } from './HoverCard';

const Story: ComponentMeta<typeof HoverCard> = {
  component: HoverCard,
  title: 'HoverCard',
};
export default Story;

const Template: ComponentStory<typeof HoverCard> = (args) => <HoverCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
