import { AddIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

import Button from '../button/Button';
import PageHeaderTab from '../page-header-tab/PageHeaderTab';

/* eslint-disable-next-line */
export interface PageHeaderProps {
  heading: string;
  onClick?: () => void;
  button?: boolean;
  buttonTitle?: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const PageHeader = ({
  heading,
  tabItems,
  onClick,
  button,
  buttonTitle,
}: PageHeaderProps) => (
  <Box
    h="60px"
    bg="white"
    zIndex="10"
    w="100%"
    borderBottom="1px solid "
    borderColor="border.layout"
    pl="s16"
  >
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" h="60px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="r2" fontWeight="SemiBold" color="gray.800">
            {heading}
          </Text>
        </Box>
        <Box h="100%" ml="48px" display="flex" alignItems="flex-end">
          <PageHeaderTab list={tabItems ?? []} />
        </Box>
      </Box>
      {button && (
        <Button mr="s16" leftIcon={<AddIcon h="11px" />} onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </Box>
  </Box>
);

export default PageHeader;
