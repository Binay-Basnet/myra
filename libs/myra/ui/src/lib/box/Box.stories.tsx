import { Meta,Story } from '@storybook/react';

import { Box, BoxProps } from './Box';

export default {
  component: Box,
  title: 'Atoms/Box',
} as Meta;

const Template: Story<BoxProps> = (args) => <Box {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  bg: 'red.500',
  w: '70%',
  h: '25%',
  children: 'This is a Red Box ',
};
