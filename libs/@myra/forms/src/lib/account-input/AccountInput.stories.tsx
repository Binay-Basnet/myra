import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountInput } from './AccountInput';

const Story: ComponentMeta<typeof AccountInput> = {
  component: AccountInput,
  title: 'Myra Design System / Forms / Account Input',
};
export default Story;

const Template: ComponentStory<typeof AccountInput> = (args) => <AccountInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
