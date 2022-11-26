import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectPopout } from './SelectPopout';

export default {
  component: SelectPopout,
  title: 'Old Dump /SelectPopout',
} as ComponentMeta<typeof SelectPopout>;

const Template: ComponentStory<typeof SelectPopout> = (args) => <SelectPopout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
