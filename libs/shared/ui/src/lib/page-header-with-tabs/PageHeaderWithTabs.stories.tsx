import { Meta, Story } from '@storybook/react';

import {
  PageHeaderWithTabs,
  PageHeaderWithTabsProps,
} from './PageHeaderWithTabs';

export default {
  component: PageHeaderWithTabs,
  title: 'PageHeaderWithTabs',
} as Meta;

const Template: Story<PageHeaderWithTabsProps> = (args) => (
  <PageHeaderWithTabs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
