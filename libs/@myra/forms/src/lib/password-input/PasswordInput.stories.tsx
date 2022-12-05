import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PasswordInput } from './PasswordInput';

const Story: ComponentMeta<typeof PasswordInput> = {
  component: PasswordInput,
  title: 'Myra Design System / Forms / Password Input',
};
export default Story;

const Template: ComponentStory<typeof PasswordInput> = (args) => <PasswordInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
