import { FormControl } from '@chakra-ui/react';

import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InventoryItemForm = ({ watch }: any) => {
  const { t } = useTranslation();

  return (
    <Box
      w="100%"
      background="white"
      p="s20"
      display="flex"
      flexDirection="column"
      gap="s32"
    >
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
        <Grid templateColumns="repeat(3,1fr)">
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="name"
              label={t['invItemName']}
              placeholder={t['invItemSelectItem']}
            />
          </GridItem>
          <GridItem>
            <FormInput
              type="text"
              name="item"
              label={t['invItemCode']}
              placeholder={t['invItemCode']}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
