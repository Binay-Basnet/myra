import { Meta, Story } from '@storybook/react';

import { NoDataState, NoDataStateProps } from './NoDataState';

export default {
  component: NoDataState,
  title: 'Old Dump /NoDataState',
} as Meta;

const Template: Story<NoDataStateProps> = (args) => <NoDataState {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
