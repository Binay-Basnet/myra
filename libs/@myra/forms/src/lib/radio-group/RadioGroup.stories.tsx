import { Meta, Story } from '@storybook/react';

import { RadioGroup, RadioGroupProps } from './RadioGroup';

export default {
  component: RadioGroup,
  title: 'Myra Design System / Forms / Radio Group',
} as Meta;

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  isDisabled: false,
  spacing: 4,
  direction: 'row',
  radioList: ['Value 1', 'Value 2', 'Value 3'],
};
