import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionMenu } from './ActionMenu';

const Story: ComponentMeta<typeof ActionMenu> = {
  component: ActionMenu,
  title: 'ActionMenu',
};
export default Story;

const Template: ComponentStory<typeof ActionMenu> = (args) => <ActionMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
