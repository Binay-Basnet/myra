import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Grid } from './Grid';

const Story: ComponentMeta<typeof Grid> = {
  component: Grid,
  title: 'Myra Design System / Foundations / Grid',
};
export default Story;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
