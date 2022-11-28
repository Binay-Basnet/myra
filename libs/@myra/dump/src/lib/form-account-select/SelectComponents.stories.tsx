import { ComponentMeta, ComponentStory } from '@storybook/react';

import { components } from './SelectComponents';

export default {
  component: components,
  title: 'Old Dump /components',
} as ComponentMeta<typeof components>;

const Template: ComponentStory<typeof components> = (args) => <components {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
