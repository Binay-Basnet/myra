import { Meta, Story } from '@storybook/react';

import { ChakraTable, ChakraTableProps } from './ChakraTable';

export default {
  component: ChakraTable,
  title: 'Old Dump /ChakraTable',
} as Meta;

const Template: Story<ChakraTableProps> = (args) => <ChakraTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
