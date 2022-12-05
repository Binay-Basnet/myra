import { Button, useDisclosure } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { Modal, ModalProps } from './Modal';

export default {
  component: Modal,
  title: 'Myra Design System / Components / Overlays / Modal',
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const { onClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>Open Modal</Button>
      <Modal {...args} onClose={onClose} open={isOpen} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: <p>Are you sure you want to delete this task?</p>,
  isSecondaryDanger: true,
  secondaryButtonVariant: 'solid',
  secondaryButtonLabel: 'Delete',
  title: 'Delete',
  autoFocus: false,
};
