import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MemberSelect } from './MemberSelect';

const Story: ComponentMeta<typeof MemberSelect> = {
  component: MemberSelect,
  title: 'Myra Design System / Forms / Member Select',
};
export default Story;

const Template: ComponentStory<typeof MemberSelect> = (args) => <MemberSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
