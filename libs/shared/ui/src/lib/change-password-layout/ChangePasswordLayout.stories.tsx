import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangePasswordLayout } from './ChangePasswordLayout';

export default {
  component: ChangePasswordLayout,
  title: 'ChangePasswordLayout',
} as ComponentMeta<typeof ChangePasswordLayout>;

const Template: ComponentStory<typeof ChangePasswordLayout> = (args) => (
  <ChangePasswordLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
