import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IndeterminateCheckbox } from './selectionHook';

export default {
  component: IndeterminateCheckbox,
  title: 'IndeterminateCheckbox',
} as ComponentMeta<typeof IndeterminateCheckbox>;

const Template: ComponentStory<typeof IndeterminateCheckbox> = (args) => (
  <IndeterminateCheckbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
