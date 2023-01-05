import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tooltip } from './Tooltip';

const Story: ComponentMeta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
};
export default Story;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
