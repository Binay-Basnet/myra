import { Meta, Story } from '@storybook/react';

import { GridItem, GridItemProps } from './GridItem';

export default {
  component: GridItem,
  title: 'Myra Design System / Components / Misc / Grid Item',
} as Meta;

const Template: Story<GridItemProps> = (args) => <GridItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
