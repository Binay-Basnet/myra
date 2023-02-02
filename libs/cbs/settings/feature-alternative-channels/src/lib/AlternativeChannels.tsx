import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import {
  AlternativeChannelServiceType,
  useGetAlternativeFeeAndChargesQuery,
  useSaveAlternativeChargesMutation,
} from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type ChargesEditTable = {
  id?: string;
  serviceType: AlternativeChannelServiceType;
  ledgerId: string;
  amount: string;
};

export const AlternativeChannels = () => {
  const { t } = useTranslation();

  const methods = useForm<{ charges: ChargesEditTable[] }>();

  const { data: acChargesData } = useGetAlternativeFeeAndChargesQuery();
  const { mutateAsync: saveChanges, isLoading } = useSaveAlternativeChargesMutation();

  useEffect(() => {
    const acCharges = acChargesData?.settings?.general?.alternativeChannel?.feesAndCharges?.data;

    if (acCharges) {
      methods.reset({
        charges: acCharges as ChargesEditTable[],
      });
    }
  }, [acChargesData]);

  return (
    <>
      <FormProvider {...methods}>
        <Box p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" gap="s16">
            <Box h="s60" display="flex" flexDir="column" gap="s4" justifyContent="center">
              <Text fontSize="r1" fontWeight="600" color="gray.800">
                {t['acFeeAndCharges']}
              </Text>
              <Text fontSize="s3" fontWeight={500} color="gray.600">
                {t['acBasicCharge']}
              </Text>
            </Box>
          </Box>

          <FormEditableTable<ChargesEditTable>
            name="charges"
            canAddRow={false}
            canDeleteRow={false}
            columns={[
              {
                accessor: 'serviceType',
                header: 'Service Name',
                fieldType: 'select',
                cellWidth: 'auto',
                selectOptions: [
                  {
                    label: t['acMBanking'],
                    value: AlternativeChannelServiceType.MobileBanking,
                  },
                  {
                    label: t['acEBanking'],
                    value: AlternativeChannelServiceType.Ebanking,
                  },
                  {
                    label: t['acSMSBanking'],
                    value: AlternativeChannelServiceType.SmsBanking,
                  },
                ],
              },
              {
                accessor: 'ledgerId',
                header: 'Ledger Name',
                cellWidth: 'auto',
                fieldType: 'modal',
                modal: COASelectModal,
              },
              {
                accessor: 'amount',
                header: 'Amount',
                isNumeric: true,
                cellWidth: 'auto',
              },
            ]}
          />
        </Box>
      </FormProvider>
      <SettingsFooter
        handleSave={async () => {
          await asyncToast({
            id: 'save',
            msgs: {
              success: 'Saved Successfully',
              loading: 'Saving Settings',
            },
            promise: saveChanges({
              data: methods.getValues().charges.map((charge) => ({
                ...charge,
                amount: String(charge.amount),
              })),
            }),
          });
        }}
        handleDiscard={() => {
          const acCharges =
            acChargesData?.settings?.general?.alternativeChannel?.feesAndCharges?.data;

          if (acCharges) {
            methods.reset({
              charges: acCharges as ChargesEditTable[],
            });
          }
        }}
        saveLoading={isLoading}
      />
    </>
  );
};

export default AlternativeChannels;
