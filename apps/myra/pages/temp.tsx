import { COASelectModal } from '@coop/cbs/utils';
import { EditableTable } from '@coop/shared/editable-table';

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
