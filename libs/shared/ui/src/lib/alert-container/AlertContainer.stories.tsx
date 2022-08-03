import { Meta,Story } from '@storybook/react';

import { AlertContainer, AlertContainerProps } from './AlertContainer';

export default {
  component: AlertContainer,
  title: 'AlertContainer',
} as Meta;

const Template: Story<AlertContainerProps> = (args) => (
  <AlertContainer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
