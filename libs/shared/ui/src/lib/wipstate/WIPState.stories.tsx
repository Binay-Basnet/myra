import { Meta, Story } from '@storybook/react';

import { WIPState, WIPStateProps } from './WIPState';

export default {
  component: WIPState,
  title: 'WIPState',
} as Meta;

const Template: Story<WIPStateProps> = (args) => <WIPState {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
