import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormCustomSelect } from './FormCustomSelect';

export default {
  component: FormCustomSelect,
  title: 'FormCustomSelect',
} as ComponentMeta<typeof FormCustomSelect>;

const Template: ComponentStory<typeof FormCustomSelect> = (args) => <FormCustomSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: '',
};
