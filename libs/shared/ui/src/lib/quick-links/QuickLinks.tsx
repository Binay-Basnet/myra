import { IconType } from 'react-icons';

import Box from '../box/Box';
import Icon from '../icon/Icon';
import Text from '../text/Text';

/* eslint-disable-next-line */
export interface QuickLinksProps {
  text: string;
  subText?: string;
  icon: IconType;
  onclick: () => void;
}

export function QuickLinks({ text, subText, icon, onclick }: QuickLinksProps) {
  return (
    <Box
      bg="gray.0"
      display="flex"
      px="s20"
      h="58px"
      gap="s16"
      justifyContent="flex-start"
      alignItems="center"
      borderRadius="br2"
      cursor="pointer"
      onClick={onclick}
    >
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
  );
}

export default QuickLinks;
