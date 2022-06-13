import { Meta, Story } from '@storybook/react';

import { Icon, IconProps } from './Icon';

export default {
  component: Icon,
  title: 'Atoms/Icon',
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'xs',
};
