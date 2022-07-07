import React from 'react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormFileInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KYMDocumentDeclaration = () => {
  const { t } = useTranslation();
  const { data: fileUploadsData, isLoading: fileUploadsLoading } =
    useGetIndividualKymOptionsQuery({
      filter: {
        customId: Kym_Field_Custom_Id.FileUploads,
      },
    });

  // console.log(
  //   fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options
  // );

  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kynIndDOCUMENTDECLARATION']}
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        {fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option) => (
            <FormFileInput
              size="lg"
              label={option.name?.local}
              name="documentsTemp"
            />
          )
        )}
      </Grid>
    </GroupContainer>
  );
};
