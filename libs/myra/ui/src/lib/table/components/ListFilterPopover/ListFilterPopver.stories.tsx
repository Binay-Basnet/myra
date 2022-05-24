import { Story, Meta } from '@storybook/react';
import { ListFilterPopover } from './ListFilterPopver';

export default {
  component: ListFilterPopover,
  title: 'ListFilterPopover',
} as Meta;

const Template: Story = (args) => <ListFilterPopover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
