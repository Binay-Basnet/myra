import { Meta, Story } from '@storybook/react';

import { ChakraPopover, PopoverProps } from './Popover';

export default {
  component: ChakraPopover,
  title: 'Popover',
} as Meta;

const Template: Story<PopoverProps> = (args) => <ChakraPopover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
