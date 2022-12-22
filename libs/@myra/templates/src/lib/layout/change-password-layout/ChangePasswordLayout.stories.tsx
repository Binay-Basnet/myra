import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ChangePasswordLayout } from './ChangePasswordLayout';

const Story: ComponentMeta<typeof ChangePasswordLayout> = {
  component: ChangePasswordLayout,
  title: 'ChangePasswordLayout',
};
export default Story;

const Template: ComponentStory<typeof ChangePasswordLayout> = (args) => (
  <ChangePasswordLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
