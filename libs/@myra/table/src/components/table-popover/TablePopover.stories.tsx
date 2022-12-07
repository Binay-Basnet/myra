import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TablePopover } from './TablePopover';

export default {
  component: TablePopover,
  title: 'Myra Design System / Table / Table Popover',
} as ComponentMeta<typeof TablePopover>;

const Template: ComponentStory<typeof TablePopover> = (args) => <TablePopover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};