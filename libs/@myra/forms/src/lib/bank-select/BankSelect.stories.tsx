import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BankSelect } from './BankSelect';

const Story: ComponentMeta<typeof BankSelect> = {
  component: BankSelect,
  title: 'BankSelect',
};
export default Story;

const Template: ComponentStory<typeof BankSelect> = (args) => <BankSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
