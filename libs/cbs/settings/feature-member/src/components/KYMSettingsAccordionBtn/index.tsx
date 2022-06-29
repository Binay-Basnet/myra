import React from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { AccordionButton, Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IKYMSettingsAccordionBtnProps {
  isExpanded: boolean;
  title: string;
}

export const KYMSettingsAccordionBtn = ({
  isExpanded,
  title,
}: IKYMSettingsAccordionBtnProps) => {
  const { t } = useTranslation();
  return (
    <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
      <Box flex="1" textAlign="left">
        <Text fontSize="r1" fontWeight="500" textTransform="capitalize">
          {t[title] ?? title}
        </Text>
      </Box>
      {isExpanded ? (
        <IoChevronUpOutline fontSize="18px" />
      ) : (
        <IoChevronDownOutline fontSize="18px" />
      )}
    </AccordionButton>
  );
};
