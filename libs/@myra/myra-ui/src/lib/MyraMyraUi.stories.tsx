import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyraMyraUi } from './MyraMyraUi';

const Story: ComponentMeta<typeof MyraMyraUi> = {
  component: MyraMyraUi,
  title: 'MyraMyraUi',
};
export default Story;

const Template: ComponentStory<typeof MyraMyraUi> = (args) => <MyraMyraUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
