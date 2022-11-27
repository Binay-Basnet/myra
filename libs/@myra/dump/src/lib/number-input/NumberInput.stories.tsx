import { Meta, Story } from '@storybook/react';

import { NumberInput, NumberInputProps } from './NumberInput';

export default {
  component: NumberInput,
  title: 'Old Dump /NumberInput',
} as Meta;

const Template: Story<NumberInputProps> = (args) => <NumberInput {...args} />;

export const Primary = Template.bind({});
Primary.args = { label: 'Amount', width: '300px' };
