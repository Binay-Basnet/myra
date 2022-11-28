import { Meta, Story } from '@storybook/react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  component: Pagination,
  title: 'Old Dump /Pagination',
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  startCursor: 'cjeniej9jdd3inedi3dj3',
  endCursor: 'cjeniej9jdd3inedi3dj3',
  pageSizeOptions: [10, 100, 250],
  total: 1000,
};
