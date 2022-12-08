import { Meta, Story } from '@storybook/react';

import { SwitchTabs, SwitchTabsProps } from './SwitchTabs';

export default {
  component: SwitchTabs,
  title: 'Myra Design System / Forms / Switch Tabs',
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
