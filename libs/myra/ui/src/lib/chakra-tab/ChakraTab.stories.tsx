import { StoryFn, Meta } from '@storybook/react';
import { ChakraTab, ChakraTabProps } from './ChakraTab';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: ChakraTab,
  title: 'Atoms/ChakraTab',
  argTypes: getThemingArgTypes(theme as Theme, 'Tabs'),
} as Meta;
const Template: StoryFn<ChakraTabProps> = (props) => (
  <ChakraTab {...props}> {props.children} </ChakraTab>
);

export const Primary = Template.bind({});
Primary.args = {
  tabList: ['Tab 1', 'Tab 2', 'Tab 3'],
};
