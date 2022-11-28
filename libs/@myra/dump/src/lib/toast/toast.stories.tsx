import { ComponentMeta, ComponentStory } from '@storybook/react';

import { toast } from './toast';

export default {
  component: toast,
  title: 'Old Dump /toast',
} as ComponentMeta<typeof toast>;

const Template: ComponentStory<typeof toast> = (args) => <toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
