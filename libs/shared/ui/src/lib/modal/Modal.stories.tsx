import { Theme } from '@chakra-ui/react';
import { getThemingArgTypes } from '@chakra-ui/storybook-addon';
import { Meta, Story } from '@storybook/react';

import { theme } from '@coop/shared/utils';

import { Modal, ModalProps } from './Modal';

export default {
  component: Modal,
  title: 'Modal',
  argTypes: getThemingArgTypes(theme as Theme, 'Modal'),
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <p>Are you sure you want to delete this task?</p>,
  title: 'Delete Action',
  autoFocus: false,
  footerPrimary2Props: 'Delete',
  footerSecondaryProps: 'Cancel',
  onClickPrimary: () => alert('Deleted!!!'),
};
