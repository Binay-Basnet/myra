import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Callout } from './Callout';

const Story: ComponentMeta<typeof Callout> = {
  component: Callout,
  title: 'Callout',
};
export default Story;

const Template: ComponentStory<typeof Callout> = (args) => <Callout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
