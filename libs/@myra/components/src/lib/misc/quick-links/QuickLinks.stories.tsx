import { IoMdPersonAdd } from 'react-icons/io';
import { Meta, Story } from '@storybook/react';

import { QuickLinks, QuickLinksProps } from './QuickLinks';

export default {
  component: QuickLinks,
  title: 'Myra Design System / Components / Misc / Quick Links',
} as Meta;

const Template: Story<QuickLinksProps> = (args) => <QuickLinks {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Hello',
  icon: IoMdPersonAdd,
};
