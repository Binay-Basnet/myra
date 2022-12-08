import { Meta, Story } from '@storybook/react';

import { NoDataState, NoDataStateProps } from './NoDataState';

export default {
  component: NoDataState,
  title: 'Myra Design System / Templates / Misc / No Data State',
} as Meta;

const Template: Story<NoDataStateProps> = (args) => <NoDataState {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
