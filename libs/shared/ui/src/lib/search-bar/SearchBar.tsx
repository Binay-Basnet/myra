import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface SearchBarProps extends InputProps {}

export function SearchBar(props: SearchBarProps) {
  const [isBlur, setisBlur] = useState(true);
  return (
    <InputGroup
      ml={'s16'}
      borderRadius={'6px'}
      border="none"
      flex={1}
      borderColor="secondary.700"
      color={isBlur ? 'gray.0' : 'gray.500'}
    >
      <InputLeftElement
        pointerEvents="none"
        color={'currentColor'}
        children={<IoSearchSharp />}
        _hover={{ color: 'gray.800' }}
      />
      <Input
        type="text"
        placeholder="खोज्नुहोस्"
        color={'gray.500'}
        fontSize="r1"
        bg={isBlur ? 'secondary.800' : 'gray.0'}
        onFocus={() => {
          setisBlur(false);
        }}
        onBlur={() => setisBlur(true)}
        _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
      />
      {isBlur && (
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
