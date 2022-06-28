import React from 'react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormFileInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KYMDocumentDeclaration = () => {
  const { t } = useTranslation();
  const { data: fileUploadsData, isLoading: fileUploadsLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'file_uploads',
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
              name={option.id}
            />
          )
        )}
      </Grid>
    </GroupContainer>
  );
};
