import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ErrorCard } from './ErrorCard';

const Story: ComponentMeta<typeof ErrorCard> = {
  component: ErrorCard,
  title: 'ErrorCard',
};
export default Story;

const Template: ComponentStory<typeof ErrorCard> = (args) => <ErrorCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
