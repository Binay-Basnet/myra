import {
  chakra,
  Icon,
  Tab,
  TabList,
  Tabs as ChakraSwitchTabs,
  TabsProps as ChakraSwitchTabsProps,
} from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';

/* eslint-disable-next-line */
export interface SwitchTabsProps extends ChakraSwitchTabsProps {
  list: string[];
}

const TabElement = chakra(Tab, {
  baseStyle: {
    tablist: {
      border: '2px solid',
      borderColor: 'inherit',
    },
    tab: {
      border: '1px solid',
      borderRadius: 'br2',
      borderColor: 'border.layout',
      margin: '-2px',
      bg: 'background.500',
      _selected: {
        color: '#343C46',
        boxShadow: 'inset 0px -2px 0px transparent',
      },
      _active: {
        bg: 'gray.0',
        borderColor: 'transparent',
      },
      _focus: {
        bg: 'gray.0',
        borderColor: 'transparent',
      },
      _disabled: {
        _active: { bg: 'none' },
      },
    },
  },
});

export function SwitchTabs(props: SwitchTabsProps) {
  const { list } = props;
  return (
    <ChakraSwitchTabs variant="unstyled">
      <TabList>
        {list.map((item) => (
          <TabElement>
            <Icon w={6} h={6} color="primary.500" as={BsDot} />
            {item}
          </TabElement>
        ))}
      </TabList>
    </ChakraSwitchTabs>
  );
}

export default SwitchTabs;
