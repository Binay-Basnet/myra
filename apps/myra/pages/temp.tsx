import { EditableTable } from '@myra-ui/editable-table';

import { COASelectModal } from '@coop/shared/components';

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
