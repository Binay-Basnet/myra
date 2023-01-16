import { FormEditableTable } from '@coop/shared/form';

type IBankTable = {
  name: string;
  date: string;
};
export const BankTable = () => (
  <FormEditableTable<IBankTable>
    name="BankInput"
    canDeleteRow={false}
    columns={[
      {
        accessor: 'name',
        header: 'Bank Name',
        cellWidth: 'auto',
      },
      {
        accessor: 'date',
        header: 'Added Date',
      },
    ]}
  />
);
