import { Meta, Story } from '@storybook/react';
import { FileInput, FileInputProps } from './FileInput';

export default {
  component: FileInput,
  title: 'Form / File Input',
} as Meta;

const Template: Story<FileInputProps> = (args) => <FileInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
