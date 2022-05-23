import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps } from './Modal';
import { theme } from '@saccos/myra/util';
import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Button } from '@saccos/myra/ui';

export default {
  component: Modal,
  title: 'Modal',
  argTypes: getThemingArgTypes(theme as Theme, 'Modal'),
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>test</ModalBody>

      <ModalFooter>
        <Button
          colorScheme="blue"
          mr={3}
          // onClick={onClose}
        >
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  ),
};
