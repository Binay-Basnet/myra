import { Meta, Story } from '@storybook/react';

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

export default {
  component: CheckboxGroup,
  title: 'Myra Design System / Forms / Checkbox Group',
} as Meta;

const Template: Story<CheckboxGroupProps> = (args) => <CheckboxGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  spacing: 4,
  direction: 'column',
  checkList: ['Label 1', 'Label 2', 'Label 3'],
  variant: 'simple',
  // icon: <AddIcon />,
  // iconColor: 'white.400',
};
