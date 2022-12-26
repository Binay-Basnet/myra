import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ShareMemberCard } from './ShareMemberCard';

const Story: ComponentMeta<typeof ShareMemberCard> = {
  component: ShareMemberCard,
  title: 'ShareMemberCard',
};
export default Story;

const Template: ComponentStory<typeof ShareMemberCard> = (args) => <ShareMemberCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
