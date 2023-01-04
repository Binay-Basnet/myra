import { DetailCardContent, DetailsCard } from '@myra-ui';

type TxnProps = {
  status: string | null | undefined;
  list: { label: string | null | undefined; value: string | null | undefined | number }[];
};

export const TxnDetails = ({ status, list }: TxnProps) => (
  <DetailsCard title="Transaction Details" hasThreeRows>
    {list?.map((item) => (
      <DetailCardContent title={item?.label} subtitle={item?.value} />
    ))}
    <DetailCardContent title="Status" status={status === 'Complete'} />
  </DetailsCard>
);
