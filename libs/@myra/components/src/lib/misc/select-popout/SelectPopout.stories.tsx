import { VscTriangleDown } from 'react-icons/vsc';
import { Box, Icon, Text } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SelectPopout } from './SelectPopout';

export default {
  component: SelectPopout,
  title: 'Myra Design System / Components / Misc / Select Popout',
} as ComponentMeta<typeof SelectPopout>;

const Template: ComponentStory<typeof SelectPopout> = (args) => <SelectPopout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  optionType: 'member',
  popoverBtn: (value) => (
    <Box display="flex" alignItems="center" gap="s4" cursor="pointer">
      <Text fontSize="r1" color="gray.800">
        {value && Array.isArray(value) ? `${value?.length} selected` : 'None Selected'}
      </Text>

      <Icon as={VscTriangleDown} />
    </Box>
  ),
  options: [
    {
      id: '235243644561',
      url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      name: 'Akash Dangol',
    },

    {
      id: '235243644562',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Akash Dangol 1',
    },
    {
      id: '235243644563',
      url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      name: 'Akash Dangol 2',
    },

    {
      id: '235243644564',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Akash Dangol 3',
    },
    {
      id: '235243644565',
      url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      name: 'Akash Dangol 4',
    },

    {
      id: '235243644566',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Akash Dangol 5',
    },
    {
      id: '235243644567',
      url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      name: 'Akash Dangol 6',
    },

    {
      id: '235243644568',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Akash Dangol 7',
    },
  ],
};
