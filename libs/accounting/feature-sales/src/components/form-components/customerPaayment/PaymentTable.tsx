import { FormEditableTable } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type CustomerPaymentTable = {
  type: string;
  date: string;
  amount: number;
  leftToAllocate: number;
  thisAllocation: number;
};

export const PaymentTable = () => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormEditableTable<CustomerPaymentTable>
          name="paymentAllocation"
          label="Payment Allocation"
          columns={[
            {
              accessor: 'type',
              header: t['CustomerPaymentType'],
              cellWidth: 'auto',
              fieldType: 'text',
              // searchOptions: search_options,
            },

            {
              accessor: 'date',
              header: t['CustomerPaymentDate'],
              // isNumeric: true,
              fieldType: 'date',
            },

            {
              accessor: 'amount',
              header: t['CustomerPaymentAmount'],
              isNumeric: true,
            },
            {
              accessor: 'leftToAllocate',
              header: t['CustomerPaymentLeftTo'],
              isNumeric: true,
            },
            {
              accessor: 'thisAllocation',
              header: t['CustomerPaymentThis'],
              isNumeric: true,
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
