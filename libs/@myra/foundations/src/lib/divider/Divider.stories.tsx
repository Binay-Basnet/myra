import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider } from './Divider';

const Story: ComponentMeta<typeof Divider> = {
  component: Divider,
  title: 'Myra Design System / Foundations / Divider',
};
export default Story;

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
