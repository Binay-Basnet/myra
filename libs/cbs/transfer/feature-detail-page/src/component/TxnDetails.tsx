import { Box, Chips, DetailCardContent, DetailsCard } from '@myra-ui';

import { TellerActivityState } from '@coop/cbs/data-access';

type TxnProps = {
  status: string | null | undefined;
  list: { label: string | null | undefined; value: string | null | undefined | number }[];
};

export const TxnDetails = ({ status, list }: TxnProps) => (
  <DetailsCard title="Transaction Details" hasThreeRows>
    {list?.map((item) => (
      <DetailCardContent title={item?.label} subtitle={item?.value} />
    ))}
    <DetailCardContent title="Status">
      <Box w="100px">
        {status === TellerActivityState.Approved && (
          <Chips variant="solid" theme="success" size="md" type="label" label="Complete" />
        )}

        {status === TellerActivityState.Pending && (
          <Chips variant="solid" theme="warning" size="md" type="label" label="Pending" />
        )}

        {status === TellerActivityState.Cancelled && (
          <Chips variant="solid" theme="danger" size="md" type="label" label="Cancelled" />
        )}
      </Box>
    </DetailCardContent>
  </DetailsCard>
);
