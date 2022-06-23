import { Meta, Story } from '@storybook/react';

import { Button, Text } from '@coop/shared/ui';

import { FormFooter, FormFooterProps } from './FormFooter';

export default {
  component: FormFooter,
  title: 'FormFooter',
} as Meta;

const Template: Story<FormFooterProps> = (args) => <FormFooter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: <Text as="i">Form details saved to draft</Text>,
  draftButton: <Button>Save Draft</Button>,
  mainButton: <Button>Next</Button>,
};
