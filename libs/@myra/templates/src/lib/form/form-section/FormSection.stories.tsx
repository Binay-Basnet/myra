import { Meta, Story } from '@storybook/react';

import { FormSection, FormSectionProps } from './FormSection';

export default {
  component: FormSection,
  title: 'Myra Design System / Templates / Form / FormSection',
} as Meta;

const Template: Story<FormSectionProps> = (args) => <FormSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
