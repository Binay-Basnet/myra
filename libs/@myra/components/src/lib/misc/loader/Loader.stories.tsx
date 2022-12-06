import { Meta, Story } from '@storybook/react';

import { Loader, LoaderProps } from './Loader';

export default {
  component: Loader,
  title: 'Myra Design System / Components / Misc / Loader',
} as Meta;

const Template: Story<LoaderProps> = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
