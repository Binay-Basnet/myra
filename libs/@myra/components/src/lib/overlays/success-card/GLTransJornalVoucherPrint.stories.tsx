import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlTransactionJornalVoucherPrint } from './GLTransJornalVoucherPrint';

const Story: ComponentMeta<typeof GlTransactionJornalVoucherPrint> = {
  component: GlTransactionJornalVoucherPrint,
  title: 'GlTransactionJornalVoucherPrint',
};
export default Story;

const Template: ComponentStory<typeof GlTransactionJornalVoucherPrint> = (args) => (
  <GlTransactionJornalVoucherPrint {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
