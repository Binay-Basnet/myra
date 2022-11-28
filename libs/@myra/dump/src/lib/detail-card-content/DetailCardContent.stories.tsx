import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailCardContent } from './DetailCardContent';

export default {
  component: DetailCardContent,
  title: 'Old Dump /Detail-Page / DetailCardContent',
} as ComponentMeta<typeof DetailCardContent>;

const Template: ComponentStory<typeof DetailCardContent> = (args) => (
  <DetailCardContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Old Dump /Loan Type',
  subtitle: 'Old Dump /Home Purchase Loan',
};
