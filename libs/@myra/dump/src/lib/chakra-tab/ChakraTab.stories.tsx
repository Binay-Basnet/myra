import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, StoryFn } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { ChakraTab, ChakraTabProps } from './ChakraTab';

export default {
  component: ChakraTab,
  title: 'Old Dump /Atoms/ChakraTab',
  argTypes: getThemingArgTypes(theme as Theme, 'Tabs'),
} as Meta;

const Template: StoryFn<ChakraTabProps> = (props) => <ChakraTab {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  tabList: ['Tab 1', 'Tab 2', 'Tab 3'],
  variant: 'unstyled',
  align: 'start',
  isFitted: false,
};
