import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageHeader } from './DetailPageHeader';

export default {
  component: DetailPageHeader,
  title: 'Myra Design System / Templates / Detail Page / Page Header',
} as ComponentMeta<typeof DetailPageHeader>;

const Template: ComponentStory<typeof DetailPageHeader> = (args) => <DetailPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Old Dump /Loan Application List',
  member: {
    name: 'Hari Bahadur Rana',
  },
};
