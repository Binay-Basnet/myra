import { Meta, Story } from '@storybook/react';

import { WIPState } from './WipState';

export default {
  component: WIPState,
  title: 'Myra Design System / Templates / Misc / WIP State',
} as Meta;

const Template: Story = () => <WIPState />;

export const Primary = Template.bind({});
Primary.args = {};
