import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailsCard } from './DetailsCard';
import DetailCardContent from '../detail-card-content/DetailCardContent';

export default {
  component: DetailsCard,
  title: 'Old Dump /Detail-Page / DetailsCard',
} as ComponentMeta<typeof DetailsCard>;

const Template: ComponentStory<typeof DetailsCard> = (args) => <DetailsCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Old Dump /Collateral and Guarantee Details',
  subtitle: 'Old Dump /Details about the valuation for loan amount',
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  title: 'Old Dump /Collateral and Guarantee Details',
  subtitle: 'Old Dump /Details about the valuation for loan amount',
  children: (
    <>
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
    </>
  ),
};
