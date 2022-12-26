import { Button } from '@chakra-ui/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ResponseDialog } from './ResponseDialog';

const Story: ComponentMeta<typeof ResponseDialog> = {
  component: ResponseDialog,
  title: 'ResponseDialog',
};
export default Story;

const Template: ComponentStory<typeof ResponseDialog> = (args) => <ResponseDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Button>Deposit</Button>,
};
