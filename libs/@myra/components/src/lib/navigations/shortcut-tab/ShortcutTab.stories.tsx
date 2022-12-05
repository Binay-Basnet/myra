import { Box } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { ShortcutTab, ShortcutTabProps } from './ShortcutTab';

export default {
  component: ShortcutTab,
  title: 'Myra Design System / Components / Navigations / Shortcut Tabs',
} as Meta;

const Template: Story<ShortcutTabProps> = (args) => (
  <Box w="80px">
    <ShortcutTab {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = { shortcut: 'Ctrl + P' };
