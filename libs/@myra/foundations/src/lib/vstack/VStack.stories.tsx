import { Meta, Story } from '@storybook/react';

import { VStack, VStackProps } from './VStack';

export default {
  component: VStack,
  title: 'Myra Design System / Foundations / VStack',
} as Meta;

const Template: Story<VStackProps> = (args) => <VStack {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
