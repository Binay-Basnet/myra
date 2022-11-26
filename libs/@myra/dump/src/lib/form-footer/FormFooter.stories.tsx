import { Button, Text } from '@myra/dump';
import { Meta, Story } from '@storybook/react';

import { FormFooter, FormFooterProps } from './FormFooter';

export default {
  component: FormFooter,
  title: 'Old Dump /FormFooter',
} as Meta;

const Template: Story<FormFooterProps> = (args) => <FormFooter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: <Text as="i">Form details saved to draft</Text>,
  draftButton: <Button>Save Draft</Button>,
  mainButtonLabel: 'Next',
  mainButtonHandler: () => {
    console.log('Hello');
  },
};
