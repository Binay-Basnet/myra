import { Meta, Story } from '@storybook/react';

import { Toast } from './ToastComponent';

export default {
  component: Toast,
  title: 'Old Dump /Toast',
} as Meta;

const Template: Story = (args) => <Toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
