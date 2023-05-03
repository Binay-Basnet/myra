import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AlertDialog } from './AlertDialog';

const Story: ComponentMeta<typeof AlertDialog> = {
  component: AlertDialog,
  title: 'AlertDialog',
};
export default Story;

const Template: ComponentStory<typeof AlertDialog> = (args) => <AlertDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
