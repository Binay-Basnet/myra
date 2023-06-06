import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useWarehouseTransferDetailsHook } from '../hooks/useWarehouseTransferHook';

export const GeneralInformationWarehouse = () => {
  const { detailData } = useWarehouseTransferDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent
        title="Source Warehouse"
        subtitle={detailData?.transferEntry?.sourceWarehouseName}
      />

      <DetailCardContent title="Service Center" subtitle={detailData?.branchName} />
      <DetailCardContent
        title="Destination Warehouse"
        subtitle={detailData?.transferEntry?.destinationWarehouseName}
      />

      <DetailCardContent title="Authorized Reciever" subtitle={detailData?.authorizedReceiver} />

      <DetailCardContent title="Authorized Sender" subtitle={detailData?.authorizedSender} />
      <DetailCardContent title="Date" subtitle={localizedDate(detailData?.transferEntry?.date)} />
      <DetailCardContent title="Refrence No" subtitle={detailData?.transferEntry?.reference} />
    </DetailsCard>
  );
};
