import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IndeterminateCheckbox } from './selectionHook';

const Story: ComponentMeta<typeof IndeterminateCheckbox> = {
  component: IndeterminateCheckbox,
  title: 'Old Dump /IndeterminateCheckbox',
};
export default Story;

const Template: ComponentStory<typeof IndeterminateCheckbox> = (args) => (
  <IndeterminateCheckbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
