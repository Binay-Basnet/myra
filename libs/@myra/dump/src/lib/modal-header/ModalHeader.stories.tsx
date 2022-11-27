import { Meta, Story } from '@storybook/react';

import { ModalHeader, ModalHeaderProps } from './ModalHeader';

export default {
  component: ModalHeader,
  title: 'Old Dump /ModalHeader',
} as Meta;

const Template: Story<ModalHeaderProps> = (args) => <ModalHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
