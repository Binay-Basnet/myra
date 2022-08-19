import { Meta, Story } from '@storybook/react';

import { FormSection, FormSectionProps } from './FormSection';

export default {
  component: FormSection,
  title: 'FormSection',
} as Meta;

const Template: Story<FormSectionProps> = (args) => <FormSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
