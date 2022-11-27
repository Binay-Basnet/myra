import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, PageHeaderTab, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

interface ITableModalHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const TableModalHeader = ({
  tabItems,
  heading,
  buttonLabel,
  buttonHandler,
}: ITableModalHeader) => {
  const { t } = useTranslation();
  return (
    <Box
      bg="white"
      zIndex="10"
      w="100%"
      position="sticky"
      borderBottom="1px solid "
      borderColor="border.layout"
      display="flex"
      alignItems="center"
      px="s16"
      py="s8"
      height="60px"
      gap="s48"
    >
      <Text fontSize="r2" fontWeight="600" color="gray.800">
        {t[heading]}
      </Text>

      <PageHeaderTab list={tabItems ?? []} />

      {buttonLabel && buttonHandler && (
        <Box display="flex" justifyContent="flex-end" flexGrow={100}>
          <Button leftIcon={<AddIcon />} onClick={buttonHandler}>
            {t[buttonLabel]}
          </Button>
        </Box>
      )}
    </Box>
  );
};
