import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Grid, GridItem } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormCheckbox, FormFileInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { KymInsAccountOperationType } from '../../types';

const booleanList = [
  {
    label: 'Single',
    value: KymInsAccountOperationType.Single,
  },
  {
    label: 'Joint',
    value: KymInsAccountOperationType.Joint,
  },
];

export const AccountOperationInstitution = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<KymInsInput>();

  const isCompanyStampCompulsory = watch('isCompanyStampCompulsory');

  return (
    <>
      <FormSection
        id="kymInsAccountOperationInstruction"
        header="kymInsAccountOperationInstruction"
      >
        <GridItem colSpan={3}>
          <FormSwitchTab options={booleanList} name="accountType" />
        </GridItem>
        <GridItem colSpan={3}>
          <Grid gap="s16">
            <FormCheckbox
              name="isCompanyStampCompulsory"
              label={t['kynInsCompanyStampCompulsory']}
            />
            {isCompanyStampCompulsory && (
              <Box w="30%">
                <FormTextArea
                  name="specialInstruction"
                  label={t['kymInsSpecialInstruction']}
                  __placeholder={t['kymInsEnterInstruction']}
                  rows={4}
                />
              </Box>
            )}
          </Grid>
        </GridItem>
      </FormSection>
      <Box display="flex" p="s20">
        {isCompanyStampCompulsory && (
          <FormFileInput size="md" label={t['kymInsCompanyStamp']} name="documents.6.identifiers" />
        )}
      </Box>
    </>
  );
};
