import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { AccordionButton, Box, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface KYMSettingsAccordionBtnProps {
  isExpanded: boolean;
  title: string;
}

export const KYMSettingsAccordionBtn = ({ isExpanded, title }: KYMSettingsAccordionBtnProps) => {
  const { t } = useTranslation();
  return (
    <AccordionButton h="60px" bg={isExpanded ? '#E0E5EB' : ''}>
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
