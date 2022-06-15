import React from 'react';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormFileInput } from '@coop/myra/components';
import { Text, Box } from '@coop/shared/ui';
import { Grid, GridItem } from '@chakra-ui/react';

export const KymAccountHolderDeclaration = () => {
  return (
    <GroupContainer id="Account Holder Declaration" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Account Holder Declaration
      </Text>
      <FormInput
        w="35%"
        type="text"
        name="accountHoldersName"
        label="Account Holder's Name"
        placeholder="Enter Account Holder's Name"
      />
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
        <GridItem>
          <Box w="124px">
            <FormFileInput
              size="md"
              label="Signature"
              name="accountHolderSignature"
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box w="124px">
            <FormFileInput size="md" label="Stamp" name="accountHolderStamp" />
          </Box>
        </GridItem>
      </Grid>
    </GroupContainer>
  );
};
