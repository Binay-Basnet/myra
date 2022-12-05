import { Meta, Story } from '@storybook/react';

import { Checkbox, CheckboxProps } from './Checkbox';
// import { AddIcon } from '@chakra-ui/icons';

export default {
  component: Checkbox,
  title: 'Myra Design System / Forms / Checkbox',
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  spacing: '8px',
  children: 'Label',
  defaultChecked: false,
  isDisabled: false,
  isInvalid: false,
  // icon: <AddIcon />,
  // iconColor: 'white.400',
};
