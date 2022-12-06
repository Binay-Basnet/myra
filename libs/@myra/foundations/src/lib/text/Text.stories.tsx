import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from './Text';

const Story: ComponentMeta<typeof Text> = {
  component: Text,
  title: 'Myra Design System / Foundations / Text',
};
export default Story;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is a Text Box',
};
