import { Meta, Story } from '@storybook/react';

import { Tags, TagsProps } from './Tags';

export default {
  component: Tags,
  title: 'Myra Design System / Components / Data Display / Tags',
} as Meta;

const Template: Story<TagsProps> = (args) => <Tags {...args} />;

export const Chip = Template.bind({});
Chip.args = {
  type: 'chip',
  size: 'md',
  label: 'Chip',
};

export const Tag = Template.bind({});
Tag.args = {
  type: 'tag',
  size: 'md',
  label: 'Tag',
  isRemovable: true,
  isDisabled: false,
};
