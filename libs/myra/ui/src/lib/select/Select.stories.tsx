import { Meta, Story } from '@storybook/react';
import Box from '../box/Box';
import { Select, SelectProps } from './Select';

export default {
  component: Select,
  title: 'Form / Select',
} as Meta;

const Template: Story<SelectProps> = (args) => (
  <Box width="275px">
    <Select {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Select State',
};
