import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toast } from './ToastComponent';

const Story: ComponentMeta<typeof Toast> = {
  component: Toast,
  title: 'Toast',
};
export default Story;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
