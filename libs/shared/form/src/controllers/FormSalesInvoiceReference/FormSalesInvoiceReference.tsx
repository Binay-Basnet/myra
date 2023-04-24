import {
  SalesSaleEntryEntry,
  useGetAccountingPurchaseEntryListQuery,
  useGetSalesSaleEntryListDataQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormSalesInvoiceReferenceProps {
  name: string;
  label: string;
  getSelectedValue: (sales: Partial<SalesSaleEntryEntry> | null | undefined) => void;

  type?: 'sales' | 'purchase';
}

type OptionType = {
  label: string | number;
  value: string | number;
  disabled?: boolean;
};

export const FormSalesInvoiceReference = ({
  name,
  label,
  getSelectedValue,
  type = 'sales',
}: IFormSalesInvoiceReferenceProps) => {
  const { data: salesListQueryData, isFetching: salesFetching } = useGetSalesSaleEntryListDataQuery(
    {
      pagination: {
        ...getPaginationQuery(),
        first: -1,
      },
    },
    { enabled: type === 'sales' }
  );

  const { data: purchaseListQueryData, isFetching: purchaseFetching } =
    useGetAccountingPurchaseEntryListQuery(
      {
        pagination: {
          ...getPaginationQuery(),
          first: -1,
        },
      },
      { enabled: type === 'purchase' }
    );

  const salesList = salesListQueryData?.accounting?.sales?.listSaleEntry?.edges;

  const salesOptions = salesList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: curVal?.node?.invoiceNo as string,
        value: curVal?.node?.invoiceNo as string,
      },
    ],
    [] as OptionType[]
  );

  const purchaseList = purchaseListQueryData?.accounting?.purchase?.list?.edges;

  const purchaseOptions = purchaseList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: curVal?.node?.referenceId as string,
        value: curVal?.node?.referenceId as string,
      },
    ],
    [] as OptionType[]
  );

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={type === 'sales' ? salesFetching : purchaseFetching}
      //   onInputChange={debounce((id) => {
      //     if (id) {
      //       setSearchTerm(id);
      //     }
      //   }, 800)}
      onChangeAction={(val: any) => {
        if (type === 'purchase') {
          const selectedValue = purchaseList?.find(
            (sales) => sales?.node?.referenceId === val?.value
          )?.node;

          getSelectedValue(selectedValue);
        } else {
          const selectedValue = salesList?.find(
            (sales) => sales?.node?.invoiceNo === val?.value
          )?.node;

          getSelectedValue(selectedValue);
        }
      }}
      options={type === 'purchase' ? purchaseOptions : salesOptions}
    />
  );
};

export default FormSalesInvoiceReference;
