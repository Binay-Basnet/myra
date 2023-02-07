import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GuaranteeAccountsHoverCard } from './GuaranteeAccountsHoverCard';

const Story: ComponentMeta<typeof GuaranteeAccountsHoverCard> = {
  component: GuaranteeAccountsHoverCard,
  title: 'GuaranteeAccountsHoverCard',
};
export default Story;

const Template: ComponentStory<typeof GuaranteeAccountsHoverCard> = (args) => (
  <GuaranteeAccountsHoverCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
