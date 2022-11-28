import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { SwitchTabs, SwitchTabsProps } from './SwitchTabs';

export default {
  component: SwitchTabs,
  title: 'Old Dump /SwitchTabs',
  argTypes: getThemingArgTypes(theme as Theme, 'Tabs'),
} as Meta;

const Template: Story<SwitchTabsProps> = (args) => <SwitchTabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'NP',
      value: 'np',
    },
    {
      label: 'AD',
      value: 'ad',
    },
    {
      label: 'BS',
      value: 'bs',
    },
  ],
  value: 'bs',
};
