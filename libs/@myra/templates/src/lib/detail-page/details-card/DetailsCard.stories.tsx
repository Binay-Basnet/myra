import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailsCard } from './DetailsCard';
import DetailCardContent from '../detail-card-content/DetailCardContent';

export default {
  component: DetailsCard,
  title: 'Myra Design System / Templates / Detail Page / Card',
} as ComponentMeta<typeof DetailsCard>;

const Template: ComponentStory<typeof DetailsCard> = (args) => <DetailsCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Collateral and Guarantee Details',
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  title: 'Collateral and Guarantee Details',
  children: (
    <>
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
      <DetailCardContent title="Loan Type" subtitle="House Purchase Loan" />
    </>
  ),
};
