import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailCardContent } from './DetailCardContent';

export default {
  component: DetailCardContent,
  title: 'Myra Design System / Templates / Detail Page / Detail Card Content',
} as ComponentMeta<typeof DetailCardContent>;

const Template: ComponentStory<typeof DetailCardContent> = (args) => (
  <DetailCardContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Loan Type',
  subtitle: 'Home Purchase Loan',
};
