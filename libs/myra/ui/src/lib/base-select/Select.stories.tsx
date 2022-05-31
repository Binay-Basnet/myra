import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { theme } from '@saccos/myra/util';
import { Meta, Story } from '@storybook/react';

import { BaseSelect, BaseSelectProps } from './BaseSelect';

export default {
  component: BaseSelect,
  title: 'Select',
  argTypes: getThemingArgTypes(theme as Theme, 'Select'),
} as Meta;

const Template: Story<BaseSelectProps> = (args) => <BaseSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'Option 1',
      value: 'option-1',
    },
    {
      label: 'Option 2',
      value: 'option-2',
    },
    {
      label: 'Option 3',
      value: 'option-3',
    },
  ],
  variant: 'outline',
};
