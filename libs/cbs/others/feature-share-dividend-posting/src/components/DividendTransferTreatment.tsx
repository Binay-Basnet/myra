import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { Box, FormSection } from '@myra-ui';

import {
  DepositProductStatus,
  DividendTreatment,
  Filter_Mode,
  useGetDepositProductSettingsListQuery,
} from '@coop/cbs/data-access';
import { FormRadioGroup, FormSelect } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const DividendTransferTreatmentSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  const router = useRouter();

  const { watch } = useFormContext();

  const { data: productListData, isFetching } = useGetDepositProductSettingsListQuery(
    {
      paginate: {
        ...getPaginationQuery(),

        order: null,
      },
      filter: {
        id: searchTerm,
        productName: searchTerm,
        productCode: searchTerm,
        objState: DepositProductStatus.Active as DepositProductStatus,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
      enabled: searchTerm !== 'undefined',
    }
  );

  const productOptions = useMemo(
    () =>
      productListData?.settings?.general?.depositProduct?.list?.edges?.map((prod) => ({
        label: prod?.node?.productName as string,
        value: prod?.node?.id as string,
      })) ?? [],
    [productListData]
  );

  const treatment = watch('treatment');

  return (
    <FormSection
      header={t['shareDividentTransferTreatment']}
      subHeader={t['shareDividentTransferTreatmentSubtitle']}
    >
      <FormRadioGroup
        name="treatment"
        options={[
          {
            label: t['shareDividentTransferTreatmentShareAndAccount'],
            value: DividendTreatment.ShareAndAccount,
          },
          {
            label: t['shareDividentTransferTreatmentAccountTransfer'],
            value: DividendTreatment.AccountTransfer,
          },
          {
            label: t['shareDividentTransferTreatmentBookPayable'],
            value: DividendTreatment.BookPayable,
          },
        ]}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <Box />
      <Box />

      {(treatment === DividendTreatment.ShareAndAccount ||
        treatment === DividendTreatment.AccountTransfer) && (
        <FormSelect
          name="productID"
          label="Preferred Product"
          options={productOptions}
          isLoading={isFetching}
          onInputChange={debounce((id) => {
            // if (id) {
            setSearchTerm(id);
            // }
          }, 800)}
          isDisabled={router?.asPath?.includes('/view')}
        />
      )}
    </FormSection>
  );
};
