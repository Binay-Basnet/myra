import type { ComponentMeta,ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';

const Story: ComponentMeta<typeof Avatar> = {
  component: Avatar,
  title: 'Design System / Foundations / Avatar',
};
export default Story;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const People = Template.bind({});
People.args = {
  size: 'lg',
  src: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/177801298/original/3d72ccef5c20114f2eee978e9004ce771bcfeb24/draw-an-illustrated-profile-pic-for-you.png'
};

export const Organizations = Template.bind({});
Organizations.args = {
  size: 'lg',
  shape:'square',
  src: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/177801298/original/3d72ccef5c20114f2eee978e9004ce771bcfeb24/draw-an-illustrated-profile-pic-for-you.png'
};
