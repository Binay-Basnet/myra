import { Meta, Story } from '@storybook/react';

import { SmallPagination, SmallPaginationProps } from './SmallPagination';

export default {
  component: SmallPagination,
  title: 'SmallPagination',
} as Meta;

const Template: Story<SmallPaginationProps> = (args) => (
  <SmallPagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  startCursor: 'cjeniej9jdd3inedi3dj3',
  endCursor: 'cjeniej9jdd3inedi3dj3',
  limit: 10,
  total: 100,
};
