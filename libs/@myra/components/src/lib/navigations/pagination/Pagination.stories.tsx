import { Meta, Story } from '@storybook/react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  component: Pagination,
  title: 'Myra Design System / Components / Navigations / Pagination',
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  pageSizeOptions: [10, 100, 250],
  total: 1000,
  pageInfo: {
    startCursor: '1390',
    endCursor: '39303',
    hasNextPage: true,
    hasPreviousPage: false,
  },
};
