import { Meta, Story } from '@storybook/react';

import { Alert, AlertProps } from './Alert';

export default {
  component: Alert,
  title: 'Old Dump /Feedbacks / Alert',
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: 'error',
  title: 'Old Dump /__placeholder',
  subtitle: 'Old Dump /There was an error processing your request',
};
