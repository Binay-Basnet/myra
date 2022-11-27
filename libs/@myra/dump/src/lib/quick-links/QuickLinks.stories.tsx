import { Meta, Story } from '@storybook/react';

import { QuickLinks, QuickLinksProps } from './QuickLinks';

export default {
  component: QuickLinks,
  title: 'Old Dump /QuickLinks',
} as Meta;

const Template: Story<QuickLinksProps> = (args) => <QuickLinks {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
