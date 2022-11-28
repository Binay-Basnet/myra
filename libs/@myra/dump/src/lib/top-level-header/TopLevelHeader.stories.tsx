import { Meta, Story } from '@storybook/react';

import { TopLevelHeader, TopLevelHeaderProps } from './TopLevelHeader';

export default {
  component: TopLevelHeader,
  title: 'Old Dump /TopLevelHeader',
} as Meta;

const Template: Story<TopLevelHeaderProps> = (args) => <TopLevelHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
