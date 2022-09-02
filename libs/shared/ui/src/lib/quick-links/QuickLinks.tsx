import { IconType } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';

import Box from '../box/Box';
import Icon from '../icon/Icon';
import Text from '../text/Text';

/* eslint-disable-next-line */
export interface QuickLinksProps {
  text: string;
  subText?: string;
  icon: IconType;
  onclick: () => void;
  editable?: boolean;
}

export function QuickLinks({
  text,
  subText,
  icon,
  onclick,
  editable,
}: QuickLinksProps) {
  return (
    <Box
      bg="gray.0"
      display="flex"
      px="s20"
      h="58px"
      gap="s16"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="br2"
      cursor="pointer"
      onClick={onclick}
      border="1px solid"
      borderColor="border.layout"
    >
      <Box display="flex" alignItems="center" gap="s12">
        <Icon as={icon} size="lg" />
        <Box display="flex" flexDirection="column">
          <Text
            lineHeight="125%"
            fontWeight="Regular"
            fontSize="s3"
            color="gray.800"
          >
            {text}
          </Text>
          {subText && (
            <Text
              lineHeight="125%"
              fontWeight="Regular"
              fontSize="s3"
              color="gray.500"
            >
              {subText}
            </Text>
          )}
        </Box>
      </Box>
      {editable && (
        <Box>
          <Icon as={AiOutlineClose} color="red.500" size="sm" />
        </Box>
      )}
    </Box>
  );
}

export default QuickLinks;
