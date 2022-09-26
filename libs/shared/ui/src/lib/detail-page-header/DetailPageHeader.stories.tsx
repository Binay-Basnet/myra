import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageHeader } from './DetailPageHeader';

export default {
  component: DetailPageHeader,
  title: 'Detail-Page / DetailPageHeader',
} as ComponentMeta<typeof DetailPageHeader>;

const Template: ComponentStory<typeof DetailPageHeader> = (args) => <DetailPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Loan Application List',
  member: {
    name: 'Hari Bahadur Rana',
  },
};
