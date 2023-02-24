import { Button, useDisclosure } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { Drawer, DrawerProps } from './Drawer';

export default {
  component: Drawer,
  title: 'Myra Design System / Components / Overlays / Drawer',
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  const { onClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>Open Drawer</Button>
      <Drawer {...args} onClose={onClose} open={isOpen} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>{' '}
    </>
  ),
  title: 'Drawer Component',
  autoFocus: false,
};
