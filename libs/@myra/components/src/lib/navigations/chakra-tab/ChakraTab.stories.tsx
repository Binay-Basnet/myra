import { Meta, StoryFn } from '@storybook/react';

import { ChakraTab, ChakraTabProps } from './ChakraTab';

export default {
  component: ChakraTab,
  title: 'Myra Design System / Components / Navigations / Tabs',
} as Meta;

const Template: StoryFn<ChakraTabProps> = (props) => <ChakraTab {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  tabList: ['Tab 1', 'Tab 2', 'Tab 3'],
  variant: 'unstyled',
  align: 'start',
  isFitted: false,
};
