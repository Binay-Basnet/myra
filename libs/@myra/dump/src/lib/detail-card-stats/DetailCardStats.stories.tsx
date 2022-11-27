import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailCardStats } from './DetailCardStats';
import Text from '../text/Text';

export default {
  component: DetailCardStats,
  title: 'Old Dump /DetailCardStats',
} as ComponentMeta<typeof DetailCardStats>;

const Template: ComponentStory<typeof DetailCardStats> = (args) => <DetailCardStats {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Old Dump /Members to Approve',
  stats: '250',
  meta: {
    growth: -200,
    time: 'Last month',
  },
  children: (
    <Text color="primary.500" fontSize="s2" fontWeight="Regular" lineHeight="s16">
      123
    </Text>
  ),
};
