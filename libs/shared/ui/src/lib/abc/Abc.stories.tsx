import { Story, Meta } from '@storybook/react';
import { Abc, AbcProps } from './Abc';

export default {
  component: Abc,
  title: 'Abc',
} as Meta;

const Template: Story<AbcProps> = (args) => <Abc {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
