import { Meta, Story } from '@storybook/react';

import { PageHeaderTab, PageHeaderTabProps } from './PageHeaderTab';

export default {
  component: PageHeaderTab,
  title: 'Myra Design System / Components / Navigations / Page Header Tabs',
} as Meta;

const Template: Story<PageHeaderTabProps> = (args) => <PageHeaderTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  list: [
    {
      title: 'Members',
      key: 'member',
    },
    {
      title: 'Share',
      key: 'member',
    },
    {
      title: 'Savings',
      key: 'member',
    },
  ],
};
