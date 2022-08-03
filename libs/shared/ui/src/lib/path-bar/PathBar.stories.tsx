import { Meta,Story } from '@storybook/react';

import { PathBar, PathBarProps } from './PathBar';

export default {
  component: PathBar,
  title: 'PathBar',
} as Meta;

const Template: Story<PathBarProps> = (args) => <PathBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
