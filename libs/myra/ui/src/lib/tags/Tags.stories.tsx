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

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  label: 'Tag',
  isRemovable: true,
  // colorScheme: 'red',
  isDisabled: true,
  onClick: () => console.log('clicked'),
};
