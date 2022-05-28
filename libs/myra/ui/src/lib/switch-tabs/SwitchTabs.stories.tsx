import { Story, Meta } from '@storybook/react';
import { SwitchTabs, SwitchTabsProps } from './SwitchTabs';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: SwitchTabs,
  title: 'SwitchTabs',
  argTypes: getThemingArgTypes(theme as Theme, 'Tabs'),
} as Meta;

const Template: Story<SwitchTabsProps> = (args) => <SwitchTabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  list: ['One', 'Two', 'Three'],
};
