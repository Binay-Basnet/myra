import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileViewer } from './FileViewer';

const Story: ComponentMeta<typeof FileViewer> = {
  component: FileViewer,
  title: 'FileViewer',
};
export default Story;

const Template: ComponentStory<typeof FileViewer> = (args) => <FileViewer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
