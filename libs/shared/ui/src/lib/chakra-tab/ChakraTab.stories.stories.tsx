import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Template } from './ChakraTab.stories';

const Story: ComponentMeta<typeof Template> = {
  component: Template,
  title: 'Template',
};
export default Story;

const Template: ComponentStory<typeof Template> = (args) => <Template {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
