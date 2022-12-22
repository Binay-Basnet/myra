import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ChangePasswordContainerLayout } from './ChangePasswordContainerLayout';

const Story: ComponentMeta<typeof ChangePasswordContainerLayout> = {
  component: ChangePasswordContainerLayout,
  title: 'ChangePasswordContainerLayout',
};
export default Story;

const Template: ComponentStory<typeof ChangePasswordContainerLayout> = (args) => (
  <ChangePasswordContainerLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
