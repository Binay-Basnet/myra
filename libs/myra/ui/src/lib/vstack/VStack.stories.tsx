import { Story, Meta } from '@storybook/react';
import { VStack, VStackProps } from './VStack';

export default {
  component: VStack,
  title: 'VStack',
} as Meta;

const Template: Story<VStackProps> = (args) => <VStack {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
