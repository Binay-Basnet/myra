import { ComponentStory, ComponentMeta } from '@storybook/react';
import { selectionHook } from './selectionHook';

export default {
  component: selectionHook,
  title: 'selectionHook',
} as ComponentMeta<typeof selectionHook>;

const Template: ComponentStory<typeof selectionHook> = (args) => (
  <selectionHook {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
