import { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import {
  chakra,
  Icon,
  Tab,
  TabList,
  Tabs as ChakraSwitchTabs,
  TabsProps as ChakraSwitchTabsProps,
  Text,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface SwitchTabsProps
  extends Omit<ChakraSwitchTabsProps, 'children'> {
  list: {
    key: string;
    value: string;
  }[];
  onclick?: (data: string | number) => void;
}

const TabElement = chakra(Tab, {
  baseStyle: {
    border: '2px solid',
    borderRadius: 'br2',
    borderColor: 'border.layout',
    bg: 'background.500',
    margin: '-2px',
    _selected: {
      color: 'neutralColorLight.g-80',
      boxShadow: 'inset 0px -2px 0px transparent',
      border: '2px solid',
      borderColor: 'border.layout',
      bg: 'gray.0',
    },
    _active: {
      border: '2px solid',
      bg: 'gray.0',
    },
    _focus: {
      bg: 'gray.0',
      borderColor: 'border.layout',
    },
    _disabled: {
      _active: { bg: 'none' },
    },
  },
});

export function SwitchTabs(props: SwitchTabsProps) {
  const { list, onclick } = props;
  const [activeTab, setActivetab] = useState<number | null>(0);

  return (
    <ChakraSwitchTabs size="sm" variant="unstyled">
      <TabList
        borderRadius="br2"
        onChange={(e) => {
          console.log(e);
        }}
      >
        {list.map((item, index) => (
          <TabElement
            onClick={() => {
              setActivetab(index);
              {
                onclick && onclick(item.key);
              }
            }}
          >
            <Icon
              w={8}
              h={8}
              color={activeTab === index ? 'primary.500' : 'gray.500'}
              as={BsDot}
            />
            <Text
              variant="switch"
              color={activeTab === index ? 'gray.800' : 'gray.600'}
            >
              {item.value}
            </Text>
          </TabElement>
        ))}
      </TabList>
    </ChakraSwitchTabs>
  );
}

export default SwitchTabs;
