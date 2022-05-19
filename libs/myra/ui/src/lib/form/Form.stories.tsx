import { Story, Meta } from '@storybook/react';
import { Form, FormProps } from './Form';

export default {
  component: Form,
  title: 'Form',
} as Meta;

const Template: Story<FormProps> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
