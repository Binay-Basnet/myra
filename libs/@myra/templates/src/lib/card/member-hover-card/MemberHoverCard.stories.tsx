import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from '@myra-ui/foundations';

import { MemberHoverCard } from './MemberHoverCard';

const Story: ComponentMeta<typeof MemberHoverCard> = {
  component: MemberHoverCard,
  title: 'MemberHoverCard',
};
export default Story;

const Template: ComponentStory<typeof MemberHoverCard> = (args) => <MemberHoverCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  memberDetails: {
    id: '23524364456',
    name: 'Ram Kumar Pandey',
    profilePicUrl: 'https://bit.ly/dan-abramov',
    gender: 'Male',
    age: '43',
    maritalStatus: 'Unmarried',
  },
  accountDetails: {
    id: '100300010001324',
    name: 'Kopila Karnadhar Saving',
  },
  trigger: (
    <Text
      fontSize="r1"
      fontWeight="500"
      color="primary.500"
      cursor="pointer"
      wordBreak="break-word"
    >
      Ram Kumar Pandey
    </Text>
  ),
};
