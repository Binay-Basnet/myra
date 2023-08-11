import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { Alert, Column, FormSection, Table, Text } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useGetSavingProductPenaltyUpdateListQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import {
  FormAmountInput,
  FormDatePicker,
  FormFileInput,
  FormNumberInput,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const PenaltyChargeUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { data: penaltyUpdateListData, isFetching } = useGetSavingProductPenaltyUpdateListQuery(
    {
      productId: productId as string,
    },
    { enabled: !!productId }
  );

  const rowData = useMemo(
    () => penaltyUpdateListData?.settings?.general?.depositProduct?.listPenaltyCharge?.data ?? [],
    [penaltyUpdateListData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.createdAt),
      },
      {
        header: 'Effective Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.effectiveDate),
      },
      {
        header: 'Penalty Rate',
        accessorFn: (row) => `${row?.payload?.penaltyRate} %`,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Amount',
        accessorFn: (row) => amountConverter(row?.payload?.penaltyAmount),
        meta: {
          isNumeric: true,
        },
      },
    ],
    [closingDate]
  );

  return (
    <FormSection templateColumns={2} header="Penalty Charge Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          {rowData?.length && (
            <Table isStatic isLoading={isFetching} data={rowData} columns={columns} />
          )}
        </Alert>
      </GridItem>
      <FormNumberInput
        name="penaltyCharge.payload.dayAfterInstallmentDate"
        label="Day from installment Date"
      />

      <FormNumberInput
        name="penaltyCharge.payload.penaltyRate"
        label="Penalty"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      <FormAmountInput
        type="number"
        name="penaltyCharge.payload.penaltyAmount"
        label="Penalty Amount"
      />

      <FormDatePicker
        name="penaltyCharge.additionalData.effectiveDate"
        label="Effective Date"
        minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
      />

      <GridItem colSpan={2}>
        <FormFileInput
          name="penaltyCharge.additionalData.fileUploads"
          label="File Upload"
          size="md"
        />
      </GridItem>

      <GridItem colSpan={2}>
        <FormTextArea name="penaltyCharge.additionalData.notes" label="Note" rows={3} />
      </GridItem>
    </FormSection>
  );
};
