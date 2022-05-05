import { Story, Meta } from '@storybook/react';
import { ChakraTab, ChakraTabProps } from './ChakraTab';

export default {
  component: ChakraTab,
  title: 'ChakraTab',
} as Meta;

const Template: Story<ChakraTabProps> = (args) => <ChakraTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
