import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageQuickLinks } from './DetailPageQuickLinks';

const Story: ComponentMeta<typeof DetailPageQuickLinks> = {
  component: DetailPageQuickLinks,
  title: 'Old Dump /DetailPageQuickLinks',
};
export default Story;

const Template: ComponentStory<typeof DetailPageQuickLinks> = (args) => (
  <DetailPageQuickLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
