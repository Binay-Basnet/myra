import { Meta, Story } from '@storybook/react';

import { PhoneNumber, PhoneNumberProps } from './PhoneNumberInput';

export default {
  component: PhoneNumber,
  title: 'Myra Design System / Forms / Phone Number Input',
} as Meta;

const Template: Story<PhoneNumberProps> = (args) => <PhoneNumber {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
