import { Meta, Story } from '@storybook/react';

import { SmallPagination, SmallPaginationProps } from './SmallPagination';

export default {
  component: SmallPagination,
  title: 'Myra Design System / Components / Navigations / Small Pagination',
} as Meta;

const Template: Story<SmallPaginationProps> = (args) => <SmallPagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  limit: 10,
  total: 100,
};
