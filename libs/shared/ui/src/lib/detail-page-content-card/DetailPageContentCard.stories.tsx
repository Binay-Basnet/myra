import { Meta, Story } from '@storybook/react';

import { DetailPageContentCard, IDetailPageContentCard } from './DetailPageContentCard';

export default {
  component: DetailPageContentCard,
  title: 'Detail-Page / Detail Page Content Card',
} as Meta;

const Template: Story<IDetailPageContentCard> = (args) => <DetailPageContentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  header: 'General Information',
  showFooter: true,
};
