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

/* eslint-disable-next-line */
export interface SearchBarProps extends InputProps {}

export function SearchBar() {
  return (
    <InputGroup
      borderRadius={'6px'}
      border="none"
      flex={1}
      borderColor="secondary.700"
      color="white"
      _hover={{ color: 'gray.700' }}
      _active={{ backgroundColor: 'gray.0' }}
    >
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={IoSearch} fontSize="lg" />}
        _hover={{ color: 'gray.800' }}
        _active={{ backgrundColor: 'gray.0' }}
      />
      <Input
        type="text"
        // placeholder="खोज्नुहोस्"
        placeholder="Search"
        color={'white'}
        fontSize="r1"
        border="none"
        _active={{ color: 'gray.800', backgroundColor: 'gray.0' }}
        bg={'secondary.900'}
        _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
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
  );
}

export default SearchBar;
