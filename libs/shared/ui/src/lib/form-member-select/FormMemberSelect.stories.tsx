import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FormMemberSelect } from './FormMemberSelect';

export default {
  component: FormMemberSelect,
  title: 'FormMemberSelect',
} as ComponentMeta<typeof FormMemberSelect>;

const Template: ComponentStory<typeof FormMemberSelect> = (args) => (
  <FormMemberSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
