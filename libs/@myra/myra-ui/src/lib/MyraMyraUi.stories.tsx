import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyraMyraUi } from './MyraMyraUi';

const Story: ComponentMeta<typeof MyraMyraUi> = {
  component: MyraMyraUi,
  title: 'Myra UI',
};
export default Story;

const Template: ComponentStory<typeof MyraMyraUi> = (args) => <MyraMyraUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
