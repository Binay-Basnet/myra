import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DetailCardContent } from './DetailCardContent';

export default {
  component: DetailCardContent,
  title: 'DetailCardContent',
} as ComponentMeta<typeof DetailCardContent>;

const Template: ComponentStory<typeof DetailCardContent> = (args) => (
  <DetailCardContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
