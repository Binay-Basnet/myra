import { Button, Text } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { FormFooter, FormFooterProps } from './FormFooter';

export default {
  component: FormFooter,
  title: 'Myra Design System / Templates / Form / Form Footer',
} as Meta;

const Template: Story<FormFooterProps> = (args) => <FormFooter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: <Text as="i">Form details saved to draft</Text>,
  draftButton: <Button>Save Draft</Button>,
  mainButtonLabel: 'Next',
};
