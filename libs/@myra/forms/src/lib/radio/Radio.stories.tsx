import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from './Radio';

const Story: ComponentMeta<typeof Radio> = {
  component: Radio,
  title: 'Myra Design System / Forms / Radio',
};
export default Story;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Radio',
};
