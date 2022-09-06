import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Template } from './Button.stories';

export default {
  component: Template,
  title: 'Template',
} as ComponentMeta<typeof Template>;

const Template: ComponentStory<typeof Template> = (args) => (
  <Template {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
