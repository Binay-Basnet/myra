import { ComponentStory, ComponentMeta } from '@storybook/react';
import { components } from './SelectComponents';

export default {
  component: components,
  title: 'components',
} as ComponentMeta<typeof components>;

const Template: ComponentStory<typeof components> = (args) => (
  <components {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
