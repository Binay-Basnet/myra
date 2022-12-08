import { AiOutlineAppstore } from 'react-icons/ai';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from './IconButton';

const Story: ComponentMeta<typeof IconButton> = {
  component: IconButton,
  title: 'Myra Design System / Foundations / Icon Button',
};
export default Story;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <AiOutlineAppstore />,
  size: 'md',
  fontSize: '24px',
};
