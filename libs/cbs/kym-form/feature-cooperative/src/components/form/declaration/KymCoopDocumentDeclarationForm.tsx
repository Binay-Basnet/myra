import React from 'react';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/myra/components';
import { Grid, Text } from '@coop/shared/ui';

export const KymCoopDocumentDeclarationForm = () => {
  return (
    <GroupContainer id="Document Declaration">
      <Text fontSize="r1" fontWeight="SemiBold">
        DOCUMENT DECLARATION
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="lg"
          label="AGM Decision Document"
          name="passportSizePhoto"
        />
        <FormFileInput
          size="lg"
          label="Registered Certificate"
          name="signaturePhoto"
        />
        <FormFileInput size="lg" label="MOA/AOA" name="citizenshipPhoto" />
        <FormFileInput
          size="lg"
          label="PAN Certificate"
          name="fingerprintPhoto"
        />

        <FormFileInput
          size="lg"
          label="Tax Clearance"
          name="citizenshipPhoto"
        />

        <FormFileInput
          size="lg"
          label="Latest Audit Report"
          name="citizenshipPhoto"
        />

        <FormFileInput size="lg" label="Logo" name="citizenshipPhoto" />

        <FormFileInput
          size="lg"
          label="Minute of Central Rep"
          name="citizenshipPhoto"
        />
      </Grid>
    </GroupContainer>
  );
};
