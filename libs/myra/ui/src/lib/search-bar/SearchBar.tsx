import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
/* eslint-disable-next-line */
export interface SearchBarProps {}

export function SearchBar(props: SearchBarProps) {
  const [isClose, setIsClose] = useState(true);
  return (
    <InputGroup
      onFocus={() => {
        setIsClose(false);
      }}
      onBlur={() => setIsClose(true)}
      flex={1}
      bg={isClose ? 'secondary.800' : 'gray.0'}
      color={isClose ? 'gray.0' : 'gray.500'}
      _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
    >
      <InputLeftElement
        pointerEvents="none"
        color={'currentColor'}
        children={<IoSearchSharp />}
      />
      <Input
        // focusBorderColor="primary.300"
        border={'2px solid'}
        // borderColor={isClose ? 'gray.50' : 'primary.500'}
        type="search"
        placeholder="खोज्नुहोस्"
        color={'gray.500'}
        fontSize="r1"
      />
      {isClose && (
        <InputRightElement
          pointerEvents="none"
          color={'currentcolor'}
          children={
            <Text fontSize={'r1'} alignItems="center" pr="s12">
              Ctrl+/
            </Text>
          }
        />
      )}
    </InputGroup>
  );
}

export default SearchBar;
