import { ComponentStory, ComponentMeta } from '@storybook/react';
import { getComponents } from './SelectComponents';

export default {
  component: getComponents,
  title: 'Old Dump /getComponents',
} as ComponentMeta<typeof getComponents>;

const Template: ComponentStory<typeof getComponents> = (args) => <getComponents {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
