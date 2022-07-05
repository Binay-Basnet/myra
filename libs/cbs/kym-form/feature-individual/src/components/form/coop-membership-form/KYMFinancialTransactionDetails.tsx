import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KYMFinancialTransactionDetails = () => {
  const { t } = useTranslation();
  const { register } = useFormContext();
  const { data: financialTransactionDetailsData } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.FinancialTransactionDetails },
    });

  return (
    <GroupContainer
      id="kymAccIndFinancialTransactionDetails"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kynIndFINANCIALTRANSACTIONDETAILS']}
      </Text>

      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize={'s3'} fontWeight="500" color="gray.700">
          {t['kynIndDetailsoftheamount']}
        </Text>
        <InputGroupContainer>
          {financialTransactionDetailsData?.members?.individual?.options.list?.data?.[0]?.options?.map(
            (option, index) => {
              register(
                `initialTransactionDetails.options.${index}.id`,
                option.id
              );
              return (
                <FormInput
                  id={`financialTransaction.${String(option?.name?.local)}`}
                  type="number"
                  // name={String(option?.name?.local)}
                  name={`initialTransactionDetails.options.${index}.value`}
                  textAlign="right"
                  label={option?.name.local}
                  placeholder="0.00"
                />
              );
            }
          )}
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
