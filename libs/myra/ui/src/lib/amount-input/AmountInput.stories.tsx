import { Meta,Story } from '@storybook/react';

import { AmountInput, AmountInputProps } from './AmountInput';

export default {
  component: AmountInput,
  title: 'form/AmountInput',
} as Meta;

const Template: Story<AmountInputProps> = (args) => <AmountInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
