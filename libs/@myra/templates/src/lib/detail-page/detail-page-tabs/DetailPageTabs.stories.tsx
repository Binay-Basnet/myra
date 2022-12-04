import { Box } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DetailPageTabs } from './DetailPageTabs';

export default {
  component: DetailPageTabs,
  title: 'Myra Design System / Templates / Detail Page / Tabs',
} as ComponentMeta<typeof DetailPageTabs>;

const Template: ComponentStory<typeof DetailPageTabs> = (args) => (
  <Box w="319px">
    <DetailPageTabs {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  tabs: ['OVERVIEW', 'DOCUMENTS', 'ACTIVITY', 'REPORTS', 'TASKS'],
};
