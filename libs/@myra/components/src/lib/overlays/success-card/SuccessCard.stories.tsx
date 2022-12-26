import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SuccessCard } from './SuccessCard';

const Story: ComponentMeta<typeof SuccessCard> = {
  component: SuccessCard,
  title: 'SuccessCard',
};
export default Story;

const Template: ComponentStory<typeof SuccessCard> = (args) => <SuccessCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Share Issue Successful',
  subTitle: 'Share issued successfully. Details of the transaction is listed below.',
  details: {
    'Transaction Id': '#1236474874893',
    Date: '2078-10-28',
    'No. of Share': 20,
    'Share Amount': '2,000',
    'Share Certificate Charge': '1,000',
    'Other Charges': '1,000',
    'Payment Mode': 'Cash',
  },
  total: '22,000.00',
  type: 'Share Issue',
};
