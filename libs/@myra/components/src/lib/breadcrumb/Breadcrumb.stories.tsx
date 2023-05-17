import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Breadcrumb } from './Breadcrumb';

const Story: ComponentMeta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: 'Breadcrumb',
};
export default Story;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
