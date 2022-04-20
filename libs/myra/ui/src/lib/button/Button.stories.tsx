import { Story, Meta } from '@storybook/react';
import Button, { IProps } from './Button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<IProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',

  isLoading: false,
  variant: 'solid',
};
