import { Button, useDisclosure } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountQRModal } from './AccountQRModal';

const Story: ComponentMeta<typeof AccountQRModal> = {
  component: AccountQRModal,
  title: 'Myra Design System / Components / Overlays / Account QR Modal',
};
export default Story;

const Template: ComponentStory<typeof AccountQRModal> = (args) => {
  const { onClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>Open Modal</Button>
      <AccountQRModal {...args} onClose={onClose} open={isOpen} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  account: {
    name: 'Ajay Dev Account',
    accountNo: '384409183094830ARE',
    accountName: 'Ajay Dev',
    phoneNo: '9847484944',
  },
};
