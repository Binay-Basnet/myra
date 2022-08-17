import { useRef } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { IoSearch } from 'react-icons/io5';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
const keyMap = {
  inputFocus: ['ctrl+/'],
  appSwitcher: 'alt+o',
  showHelpOptions: ['alt+l'],

  // up: ["i"],
  // shiftUp: ["shift+i"],
  // delete: ["r"],
  // addFocus: ["a"]
};

/* eslint-disable-next-line */
export interface SearchBarProps extends InputProps {}

export function SearchBar() {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const handlers = {
    inputFocus() {
      searchBarRef.current?.focus();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <InputGroup
        borderRadius={'6px'}
        border="none"
        flex={1}
        color="white"
        borderColor="secondary.700"
        _hover={{ color: 'gray.700' }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={IoSearch} fontSize="lg" />}
          color={'currentcolor'}
        />
        <Input
          type="text"
          // placeholder="खोज्नुहोस्"
          placeholder="Search"
          color={'white'}
          fontSize="r1"
          ref={searchBarRef}
          border="none"
          bg={'secondary.900'}
          _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
          _focus={{ color: 'gray.800', backgroundColor: 'gray.0' }}
        />

        <InputRightElement
          pointerEvents="none"
          color={'currentcolor'}
          children={
            <Text fontSize={'r1'} alignItems="center" pr="s12">
              Ctrl+/
            </Text>
          }
        />
      </InputGroup>
    </GlobalHotKeys>
  );
}

export default SearchBar;
