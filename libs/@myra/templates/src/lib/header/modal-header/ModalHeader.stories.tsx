import { Meta, Story } from '@storybook/react';

import { ModalHeader, ModalHeaderProps } from './ModalHeader';

export default {
  component: ModalHeader,
  title: 'Myra Design System / Templates / Header / Modal Header',
} as Meta;

const Template: Story<ModalHeaderProps> = (args) => <ModalHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  heading: 'Modal',
};
