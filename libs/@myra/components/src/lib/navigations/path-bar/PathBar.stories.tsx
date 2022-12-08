import { Meta, Story } from '@storybook/react';

import { PathBar, PathBarProps } from './PathBar';

export default {
  component: PathBar,
  title: 'Myra Design System / Components / Navigations / Path Bar',
} as Meta;

const Template: Story<PathBarProps> = (args) => <PathBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  paths: [
    { label: 'All Reports', link: '/' },
    { label: 'Share Report', link: '/' },
  ],
};
