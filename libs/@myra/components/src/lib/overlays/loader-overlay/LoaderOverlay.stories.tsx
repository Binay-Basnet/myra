import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoaderOverlay } from './LoaderOverlay';

const Story: ComponentMeta<typeof LoaderOverlay> = {
  component: LoaderOverlay,
  title: 'LoaderOverlay',
};
export default Story;

const Template: ComponentStory<typeof LoaderOverlay> = (args) => <LoaderOverlay {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
