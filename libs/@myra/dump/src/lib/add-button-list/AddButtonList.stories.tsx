import { Meta, Story } from '@storybook/react';

import { AddButtonList, AddButtonListProps } from './AddButtonList';

export default {
  component: AddButtonList,
  title: 'Old Dump /AddButtonList',
} as Meta;

const Template: Story<AddButtonListProps> = (args) => <AddButtonList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
