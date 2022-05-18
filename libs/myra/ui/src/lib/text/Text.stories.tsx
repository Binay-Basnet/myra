import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from './Text';

export default {
  component: Text,
  title: 'Text',
} as Meta;

const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is a Text Box ',
};
