import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymAccountHolderDeclaration = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="kymCoopAccAccountHolderDeclaration"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopAccountHolderDeclaration']}
      </Text>
      <FormInput
        w="35%"
        type="text"
        name="accountHoldersName"
        label={t['kymCoopAccountHolderName']}
        placeholder={t['kymCoopEnterAccountHolderName']}
      />
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
        <GridItem>
          <Box w="124px">
            <FormFileInput
              size="md"
              label={t['kymCoopSignature']}
              name="accountHolderSignature"
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box w="124px">
            <FormFileInput
              size="md"
              label={t['kymCoopStamp']}
              name="accountHolderStamp"
            />
          </Box>
        </GridItem>
      </Grid>
    </GroupContainer>
  );
};
