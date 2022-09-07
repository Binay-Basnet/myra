import { IconType } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';

import Box from '../box/Box';
import Icon from '../icon/Icon';
import Text from '../text/Text';

const GRID2X3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
    >
      <path
        d="M4.16659 11.9997C4.16659 12.9163 3.41659 13.6663 2.49992 13.6663C1.58325 13.6663 0.833252 12.9163 0.833252 11.9997C0.833252 11.083 1.58325 10.333 2.49992 10.333C3.41659 10.333 4.16659 11.083 4.16659 11.9997ZM2.49992 5.33301C1.58325 5.33301 0.833252 6.08301 0.833252 6.99967C0.833252 7.91634 1.58325 8.66634 2.49992 8.66634C3.41659 8.66634 4.16659 7.91634 4.16659 6.99967C4.16659 6.08301 3.41659 5.33301 2.49992 5.33301ZM2.49992 0.333008C1.58325 0.333008 0.833252 1.08301 0.833252 1.99967C0.833252 2.91634 1.58325 3.66634 2.49992 3.66634C3.41659 3.66634 4.16659 2.91634 4.16659 1.99967C4.16659 1.08301 3.41659 0.333008 2.49992 0.333008ZM7.49992 3.66634C8.41659 3.66634 9.16659 2.91634 9.16659 1.99967C9.16659 1.08301 8.41659 0.333008 7.49992 0.333008C6.58325 0.333008 5.83325 1.08301 5.83325 1.99967C5.83325 2.91634 6.58325 3.66634 7.49992 3.66634ZM7.49992 5.33301C6.58325 5.33301 5.83325 6.08301 5.83325 6.99967C5.83325 7.91634 6.58325 8.66634 7.49992 8.66634C8.41659 8.66634 9.16659 7.91634 9.16659 6.99967C9.16659 6.08301 8.41659 5.33301 7.49992 5.33301ZM7.49992 10.333C6.58325 10.333 5.83325 11.083 5.83325 11.9997C5.83325 12.9163 6.58325 13.6663 7.49992 13.6663C8.41659 13.6663 9.16659 12.9163 9.16659 11.9997C9.16659 11.083 8.41659 10.333 7.49992 10.333Z"
        fill="#636972"
      />
    </svg>
  );
};

/* eslint-disable-next-line */
export interface QuickLinksProps {
  text: string;
  subText?: string;
  icon: IconType;
  onclick: () => void;
  editable?: boolean;
  editLinks?: boolean;
}

export function QuickLinks({
  text,
  subText,
  icon,
  onclick,
  editable,
  editLinks,
}: QuickLinksProps) {
  return (
    <Box
      bg="gray.0"
      display="flex"
      p="s20"
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
        {editLinks && <Icon as={GRID2X3} size="lg" />}
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
