import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LocaleSwitcher } from './LocaleSwitcher';

export default {
  component: LocaleSwitcher,
  title: 'Old Dump /LocaleSwitcher',
} as ComponentMeta<typeof LocaleSwitcher>;

const Template: ComponentStory<typeof LocaleSwitcher> = (args) => <LocaleSwitcher {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
