import { BsFillCaretRightFill } from 'react-icons/bs';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { Button } from '@coop/shared/ui';

import { useAccordion } from './Accordion';

interface ITreeHeaderProps {
  code: string;
  title: string;
  isExtensible?: boolean;
}

function TreeHeader(props: ITreeHeaderProps) {
  const { isOpen } = useAccordion();
  const { code, title, isExtensible } = props;
  return (
    <HStack ml="-7px" alignItems="center">
      <Icon
        pl={1}
        as={BsFillCaretRightFill}
        color="gray.500"
        transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
        transition="0.4s all ease"
      />
      <HStack>
        <Text fontWeight="bold" fontSize="14px">
          {code}
        </Text>
        <Text fontWeight="400" fontSize="14px" color="gray.800">
          {title}
        </Text>
        {/* {isExtensible && <Button variant="link">Add Group</Button>} */}
      </HStack>
    </HStack>
  );
}

export default TreeHeader;
