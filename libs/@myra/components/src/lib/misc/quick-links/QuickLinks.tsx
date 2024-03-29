import { IconType } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';

import { Box, Icon, Text } from '@myra-ui/foundations';

import { GRID2X3 } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface QuickLinksProps {
  text: string;
  subText?: string;
  icon: IconType;
  onclick: () => void;
  editable?: boolean;
  editLinks?: boolean;
}

export const QuickLinks = ({
  text,
  subText,
  icon,
  onclick,
  editable,
  editLinks,
}: QuickLinksProps) => (
  <Box
    bg="gray.0"
    display="flex"
    p="s20"
    h="3.125rem"
    gap="s16"
    justifyContent="space-between"
    alignItems="center"
    borderRadius="br2"
    cursor="pointer"
    data-testid={text}
    onClick={onclick}
    border="1px"
    borderColor="border.layout"
  >
    <Box display="flex" alignItems="center" gap="s8">
      {editLinks && <Icon as={GRID2X3} size="lg" />}
      <Icon color="gray.600" as={icon} size="md" />
      <Box display="flex" flexDirection="column">
        <Text lineHeight="125%" fontWeight="Regular" fontSize="s3" color="gray.800">
          {text}
        </Text>
        {subText && (
          <Text lineHeight="125%" fontWeight="Regular" fontSize="s3" color="gray.500">
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

export default QuickLinks;
