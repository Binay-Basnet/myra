import { Meta, Story } from '@storybook/react';

import { PhoneNumber, PhoneNumberProps } from './PhoneNumber';

export default {
  component: PhoneNumber,
  title: 'form/PhoneNumber',
} as Meta;

const Template: Story<PhoneNumberProps> = (args) => <PhoneNumber {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
