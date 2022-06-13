import { Meta, Story } from '@storybook/react';

import { SearchBar, SearchBarProps } from './SearchBar';

export default {
  component: SearchBar,
  title: 'SearchBar',
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
