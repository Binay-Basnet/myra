import { ComponentMeta,ComponentStory } from '@storybook/react';

import { ChangePasswordLayout } from './ChangePasswordLayout';

export default {
  component: ChangePasswordLayout,
  title: 'Old Dump /ChangePasswordLayout',
} as ComponentMeta<typeof ChangePasswordLayout>;

const Template: ComponentStory<typeof ChangePasswordLayout> = (args) => (
  <ChangePasswordLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
