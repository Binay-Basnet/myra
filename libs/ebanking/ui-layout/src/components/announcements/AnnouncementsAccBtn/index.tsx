import { IoChevronForward } from 'react-icons/io5';

import { AccordionButton, Icon, Text } from '@coop/shared/ui';

interface IAnnouncementsAccBtn {
  isExpanded: boolean;
  label: string;
}

export const AnnouncementsAccBtn = ({
  isExpanded,
  label,
}: IAnnouncementsAccBtn) => {
  return (
    <AccordionButton
      borderBottom="1px"
      borderBottomColor="border.layout"
      display="flex"
      justifyContent="space-between"
      px="s16"
      h="45px"
    >
      <Text fontSize="r1" color="gray.700" fontWeight="500">
        {label}
      </Text>
      <Icon
        as={IoChevronForward}
        size="sm"
        transition="transform 0.2s ease"
        transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
        color="primary.500"
      />
    </AccordionButton>
  );
};
