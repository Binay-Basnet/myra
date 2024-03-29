import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { AccordionButton, Box, Text } from '@myra-ui';

export interface KYMSettingsFieldBtnProps {
  isExpanded: boolean;
  title: string;
}

export const KYMSettingFieldBtn = ({ isExpanded, title }: KYMSettingsFieldBtnProps) => (
  <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
    <Box flex="1" textAlign="left">
      <Text fontSize="r1" fontWeight="500" textTransform="capitalize">
        {title}
      </Text>
    </Box>
    {isExpanded ? <IoChevronUpOutline fontSize="18px" /> : <IoChevronDownOutline fontSize="18px" />}
  </AccordionButton>
);
