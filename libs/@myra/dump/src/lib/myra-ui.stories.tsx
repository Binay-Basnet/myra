import { Meta, Story } from '@storybook/react';

import { MyraUi, MyraUiProps } from './myra-ui';

export default {
  component: MyraUi,
  title: 'Old Dump /MyraUi',
} as Meta;

const Template: Story<MyraUiProps> = (args) => <MyraUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
