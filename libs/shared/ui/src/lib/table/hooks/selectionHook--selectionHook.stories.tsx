import { ComponentStory, ComponentMeta } from '@storybook/react';
import { selectionHook } from './selectionHook';

const Story: ComponentMeta<typeof selectionHook> = {
  component: selectionHook,
  title: 'selectionHook',
};
export default Story;

const Template: ComponentStory<typeof selectionHook> = (args) => <selectionHook {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
