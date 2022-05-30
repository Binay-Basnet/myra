import { Story, Meta } from '@storybook/react';
import { AmountInputNormal, AmountInputNormalProps } from './AmountInputNormal';

export default {
  component: AmountInputNormal,
  title: 'form/AmountInputNormal',
} as Meta;

const Template: Story<AmountInputNormalProps> = (args) => (
  <AmountInputNormal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
