import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageQuickLinks } from './DetailPageQuickLinks';

const Story: ComponentMeta<typeof DetailPageQuickLinks> = {
  component: DetailPageQuickLinks,
  title: 'Myra Design System / Templates / Detail Page / Quick Links',
};
export default Story;

const Template: ComponentStory<typeof DetailPageQuickLinks> = (args) => (
  <DetailPageQuickLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
