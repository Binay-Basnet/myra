import { Meta, Story } from '@storybook/react';

import {
  DetailPageContentCard,
  DetailPageContentCardProps,
} from './DetailPageContentCard';

export default {
  component: DetailPageContentCard,
  title: 'DetailPageContentCard',
} as Meta;

const Template: Story<DetailPageContentCardProps> = (args) => (
  <DetailPageContentCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
