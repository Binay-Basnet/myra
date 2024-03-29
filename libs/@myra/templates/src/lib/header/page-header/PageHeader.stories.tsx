import { Meta, Story } from '@storybook/react';

import { PageHeader, PageHeaderProps } from './PageHeader';

export default {
  component: PageHeader,
  title: 'Myra Design System / Templates / Header / Page Header',
} as Meta;

const Template: Story<PageHeaderProps> = (args) => <PageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  heading: 'Page Header',
};
