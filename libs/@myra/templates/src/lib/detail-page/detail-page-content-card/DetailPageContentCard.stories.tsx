import { Meta, Story } from '@storybook/react';

import { DetailPageContentCard, IDetailPageContentCard } from './DetailPageContentCard';

export default {
  component: DetailPageContentCard,
  title: 'Myra Design System / Templates / Detail Page / Detail Content Card',
} as Meta;

const Template: Story<IDetailPageContentCard> = (args) => <DetailPageContentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  header: 'General Information',
  showFooter: true,
};
