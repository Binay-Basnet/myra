import { Meta, Story } from '@storybook/react';

import { PageHeader, PageHeaderProps } from './PageHeader';

export default {
  component: PageHeader,
  title: 'Old Dump /PageHeader',
} as Meta;

const Template: Story<PageHeaderProps> = (args) => <PageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
