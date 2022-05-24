import { Story, Meta } from '@storybook/react';
import { Tags, TagsProps } from './Tags';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';

export default {
  component: Tags,
  title: 'Tags',
  argTypes: getThemingArgTypes(theme as Theme, 'Tag'),
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
  onClick: () => console.log('clicked'),
};
