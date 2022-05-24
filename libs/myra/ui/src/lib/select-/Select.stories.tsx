import { Story, Meta } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
export default {
  component: Select,
  title: 'Select',
  argTypes: getThemingArgTypes(theme as Theme, 'Select'),
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

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
  variant: 'solid',
};
