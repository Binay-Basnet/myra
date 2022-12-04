import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NumberInput } from './NumberInput';

const Story: ComponentMeta<typeof NumberInput> = {
  component: NumberInput,
  title: 'Myra Design System / Forms / Number Input',
};
export default Story;

const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
