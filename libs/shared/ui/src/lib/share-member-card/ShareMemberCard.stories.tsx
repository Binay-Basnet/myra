import { Story, Meta } from '@storybook/react';
import { ShareMemberCard, ShareMemberCardProps } from './ShareMemberCard';

export default {
  component: ShareMemberCard,
  title: 'ShareMemberCard',
} as Meta;

const Template: Story<ShareMemberCardProps> = (args) => (
  <ShareMemberCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};