import { Meta,Story } from '@storybook/react';

import { PageHeaderTab, PageHeaderTabProps } from './PageHeaderTab';

export default {
  component: PageHeaderTab,
  title: 'PageHeaderTab',
} as Meta;

const Template: Story<PageHeaderTabProps> = (args) => (
  <PageHeaderTab {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
