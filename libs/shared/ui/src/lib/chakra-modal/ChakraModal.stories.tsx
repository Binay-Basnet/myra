import { Meta, Story } from '@storybook/react';

import { ChakraModal, ChakraModalProps } from './ChakraModal';

export default {
  component: ChakraModal,
  title: 'ChakraModal',
} as Meta;

const Template: Story<ChakraModalProps> = (args) => <ChakraModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
