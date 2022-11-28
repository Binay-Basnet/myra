import { Meta, Story } from '@storybook/react';

import { AmountInputNormal, AmountInputNormalProps } from './AmountInputNormal';

export default {
  component: AmountInputNormal,
  title: 'Old Dump /form/AmountInputNormal',
} as Meta;

const Template: Story<AmountInputNormalProps> = (args) => <AmountInputNormal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
