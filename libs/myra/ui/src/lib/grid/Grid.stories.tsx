import { Meta,Story } from '@storybook/react';

import { Grid, GridProps } from './Grid';

export default {
  component: Grid,
  title: 'Grid',
} as Meta;

const Template: Story<GridProps> = (args) => <Grid {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
