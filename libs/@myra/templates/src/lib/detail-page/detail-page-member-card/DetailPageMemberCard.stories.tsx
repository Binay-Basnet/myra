import { Box } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageMemberCard } from './DetailPageMemberCard';

export default {
  component: DetailPageMemberCard,
  title: 'Myra Design System / Templates / Detail Page / Member Card',
} as ComponentMeta<typeof DetailPageMemberCard>;

const Template: ComponentStory<typeof DetailPageMemberCard> = (args) => (
  <Box w="319px" bg="white" borderRadius="br2" boxShadow="E1" border="1px" borderColor="gray.400">
    <DetailPageMemberCard {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'Hari Bahadur Rana',
  id: '23524364456',
};
