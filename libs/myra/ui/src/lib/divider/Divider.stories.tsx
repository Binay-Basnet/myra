import { Meta,Story } from '@storybook/react';

import { Divider, DividerProps } from './Divider';

export default {
  component: Divider,
  title: 'Atoms/Divider',
} as Meta;

const Template: Story<DividerProps> = (args) => <Divider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
