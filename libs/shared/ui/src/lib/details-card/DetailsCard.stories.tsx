import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DetailsCard } from './DetailsCard';

export default {
  component: DetailsCard,
  title: 'DetailsCard',
} as ComponentMeta<typeof DetailsCard>;

const Template: ComponentStory<typeof DetailsCard> = (args) => <DetailsCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
