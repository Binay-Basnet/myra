import { Meta, Story } from '@storybook/react';

import {
  PopOverComponentForButtonList,
  PopOverComponentForButtonListProps,
} from './ButtonListPopover';

export default {
  component: PopOverComponentForButtonList,
  title: 'Myra Design System / Templates / Misc / Button List Popover',
} as Meta;

const Template: Story<PopOverComponentForButtonListProps> = (args) => (
  <PopOverComponentForButtonList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  buttonLabel: 'New Member',
};
