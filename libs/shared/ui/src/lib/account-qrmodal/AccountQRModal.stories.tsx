import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountQRModal } from './AccountQRModal';

const Story: ComponentMeta<typeof AccountQRModal> = {
  component: AccountQRModal,
  title: 'AccountQRModal',
};
export default Story;

const Template: ComponentStory<typeof AccountQRModal> = (args) => <AccountQRModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
