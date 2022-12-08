import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from './Icon';

const Story: ComponentMeta<typeof Icon> = {
  component: Icon,
  title: 'Myra Design System / Foundations / Icon',
};
export default Story;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'sm',
};
