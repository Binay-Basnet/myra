import { Meta, Story } from '@storybook/react';

import { AddButtonList, AddButtonListProps } from './AddButtonList';

export default {
  component: AddButtonList,
  title: 'Myra Design System / Components / Navigations / AddButtonList',
} as Meta;

const Template: Story<AddButtonListProps> = (args) => <AddButtonList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Member List',
};
