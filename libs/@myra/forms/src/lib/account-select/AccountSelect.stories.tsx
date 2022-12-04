import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountSelect } from './AccountSelect';

const Story: ComponentMeta<typeof AccountSelect> = {
  component: AccountSelect,
  title: 'Myra Design System / Forms / Account Select',
};
export default Story;

const Template: ComponentStory<typeof AccountSelect> = (args) => <AccountSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
