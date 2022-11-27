import { Meta, Story } from '@storybook/react';

import {
  PopOverComponentForButtonList,
  PopOverComponentForButtonListProps,
} from './PopOverComponentForButtonList';

export default {
  component: PopOverComponentForButtonList,
  title: 'Old Dump /PopOverComponentForButtonList',
} as Meta;

const Template: Story<PopOverComponentForButtonListProps> = (args) => (
  <PopOverComponentForButtonList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
