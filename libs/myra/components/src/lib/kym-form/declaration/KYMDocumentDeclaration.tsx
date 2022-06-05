import React from 'react';
import { Grid, Text } from '@coop/myra/ui';

import { GroupContainer } from '../containers';
import { FormFileInput } from '../../newFormComponents/FormFileInput';

export const KYMDocumentDeclaration = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        DOCUMENT DECLARATION
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          label="Passport Size Photo"
          control={control}
          name="passportSizePhoto"
        />
        <FormFileInput
          label="Signature"
          control={control}
          name="signaturePhoto"
        />
        <FormFileInput
          label="Citizenship Photo"
          control={control}
          name="citizenshipPhoto"
        />
        <FormFileInput
          label="Fingerprint Photo"
          control={control}
          name="fingerprintPhoto"
        />
      </Grid>
    </GroupContainer>
  );
};
