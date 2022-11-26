import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountInput } from './AccountInput';

const Story: ComponentMeta<typeof AccountInput> = {
  component: AccountInput,
  title: 'Old Dump /AccountInput',
};
export default Story;

const Template: ComponentStory<typeof AccountInput> = (args) => <AccountInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
