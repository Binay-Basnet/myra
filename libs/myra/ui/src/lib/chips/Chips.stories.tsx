import { Story, Meta } from '@storybook/react';
import { Chips, ChipsProps } from './Chips';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: Chips,
  title: 'Chips',
  argTypes: getThemingArgTypes(theme as Theme, 'Tag'),
} as Meta;

const Template: Story<ChipsProps> = (args) => <Chips {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'xs',
  label: 'Tag',
  colorScheme: 'black',
};
