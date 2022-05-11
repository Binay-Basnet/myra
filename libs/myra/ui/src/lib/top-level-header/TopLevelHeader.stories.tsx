import { Story, Meta } from '@storybook/react';
import { TopLevelHeader, TopLevelHeaderProps } from './TopLevelHeader';

export default {
  component: TopLevelHeader,
  title: 'TopLevelHeader',
} as Meta;

const Template: Story<TopLevelHeaderProps> = (args) => (
  <TopLevelHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
