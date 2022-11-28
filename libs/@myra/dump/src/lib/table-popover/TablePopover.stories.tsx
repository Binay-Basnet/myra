import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TablePopover } from './TablePopover';

export default {
  component: TablePopover,
  title: 'Old Dump /TablePopover',
} as ComponentMeta<typeof TablePopover>;

const Template: ComponentStory<typeof TablePopover> = (args) => <TablePopover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
