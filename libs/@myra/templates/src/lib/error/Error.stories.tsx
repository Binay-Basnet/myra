import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Error } from './Error';

const Story: ComponentMeta<typeof Error> = {
  component: Error,
  title: 'Error',
};
export default Story;

const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
