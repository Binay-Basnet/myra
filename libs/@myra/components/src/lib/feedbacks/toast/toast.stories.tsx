import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { toast } from './toast';

const Story: ComponentMeta<typeof toast> = {
  component: toast,
  title: 'toast',
};
export default Story;

const Template: ComponentStory<typeof toast> = (args) => <toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
