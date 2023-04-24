import { SalesSaleEntryEntry, useGetSalesSaleEntryListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormSalesInvoiceReferenceProps {
  name: string;
  label: string;
  getSelectedValue: (sales: Partial<SalesSaleEntryEntry> | null | undefined) => void;
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
}: IFormSalesInvoiceReferenceProps) => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const { watch } = useFormContext();

  const { data: salesListQueryData, isFetching } = useGetSalesSaleEntryListDataQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
    },
    // filter: {
    //   name: searchTerm,
    // },
  });

  const salesList = salesListQueryData?.accounting?.sales?.listSaleEntry?.edges;

  const salesOptions = salesList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        // label: `${curVal?.node?.customerName} [ID:${curVal?.node?.invoiceNo}]`,
        label: curVal?.node?.invoiceNo as string,
        value: curVal?.node?.invoiceNo as string,
      },
    ],
    [] as OptionType[]
  );

  // useEffect(() => {
  //   const term = watch(name);
  //   setSearchTerm(term);
  // }, []);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      //   onInputChange={debounce((id) => {
      //     if (id) {
      //       setSearchTerm(id);
      //     }
      //   }, 800)}
      onChangeAction={(val: any) => {
        const selectedValue = salesList?.find(
          (sales) => sales?.node?.invoiceNo === val?.value
        )?.node;

        getSelectedValue(selectedValue);
      }}
      options={salesOptions}
    />
  );
};

export default FormSalesInvoiceReference;
