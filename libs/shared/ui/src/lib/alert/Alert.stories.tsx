import { Meta, Story } from '@storybook/react';

import { Alert, AlertProps } from './Alert';

export default {
  component: Alert,
  title: 'Feedbacks / Alert',
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: 'error',
  title: '__placeholder',
  subtitle: 'There was an error processing your request',
};
