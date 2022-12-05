import { COASelectModal } from '@coop/shared/components';
import { EditableTable } from '@myra-ui/editable-table';

const Temp = () => (
  <EditableTable
    debug
    defaultData={[{ ledger: '20.1' }]}
    columns={[
      {
        accessor: 'ledger',
        cellWidth: 'auto',
        header: 'Ledger',
        fieldType: 'modal',
        modal: COASelectModal,
      },
    ]}
  />
);

export default Temp;
