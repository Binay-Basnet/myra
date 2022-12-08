import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LocaleSwitcher } from './LocaleSwitcher';

export default {
  component: LocaleSwitcher,
  title: 'Myra Design System / Components / Misc / Locale Switcher',
} as ComponentMeta<typeof LocaleSwitcher>;

const Template: ComponentStory<typeof LocaleSwitcher> = () => <LocaleSwitcher />;

export const Primary = Template.bind({});
Primary.args = {};
