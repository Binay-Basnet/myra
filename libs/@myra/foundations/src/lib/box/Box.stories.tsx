import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from './Box';

const Story: ComponentMeta<typeof Box> = {
  component: Box,
  title: 'Myra Design System / Foundations / Box',
};
export default Story;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
