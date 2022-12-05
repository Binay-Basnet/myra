import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { FileInput } from './FileInput';

const Story: ComponentMeta<typeof FileInput> = {
  component: FileInput,
  title: 'Myra Design System / Forms / File Input',
};
export default Story;

const Template: ComponentStory<typeof FileInput> = (args) => <FileInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
