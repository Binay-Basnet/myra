import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DetailPageQuickLinks } from './DetailPageQuickLinks';

const Story: ComponentMeta<typeof DetailPageQuickLinks> = {
  component: DetailPageQuickLinks,
  title: 'DetailPageQuickLinks',
};
export default Story;

const Template: ComponentStory<typeof DetailPageQuickLinks> = (args) => (
  <DetailPageQuickLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
