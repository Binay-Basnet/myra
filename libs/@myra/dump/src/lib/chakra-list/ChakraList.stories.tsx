import { Meta, Story } from '@storybook/react';

import { ChakraList, ChakraListProps } from './ChakraList';

export default {
  component: ChakraList,
  title: 'Old Dump /ChakraList',
} as Meta;

const Template: Story<ChakraListProps> = (args) => <ChakraList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
