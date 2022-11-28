import { Meta, Story } from '@storybook/react';

import { SlugInput, SlugInputProps } from './SlugInput';

export default {
  component: SlugInput,
  title: 'Old Dump /SlugInput',
} as Meta;

const Template: Story<SlugInputProps> = (args) => <SlugInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
