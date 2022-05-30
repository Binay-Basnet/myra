import { Meta,Story } from '@storybook/react';

import { BaseSelect, BaseSelectProps } from './BaseSelect';

export default {
  component: BaseSelect,
  title: 'BaseSelect',
} as Meta;

const Template: Story<BaseSelectProps> = (args) => <BaseSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
