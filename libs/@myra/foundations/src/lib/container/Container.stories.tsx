import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container } from './Container';

const Story: ComponentMeta<typeof Container> = {
  component: Container,
  title: 'Myra Design System / Foundations / Container',
};
export default Story;

const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
