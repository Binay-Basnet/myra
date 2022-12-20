import { DetailCardContent, DetailsCard } from '@myra-ui';

type FeesAndChargesProps = {
  charges:
    | ({
        name?: string | null | undefined;
        value?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
};

export const FeesAndCharges = ({ charges }: FeesAndChargesProps) => (
  <DetailsCard title="Fees and Charges" hasThreeRows>
    {charges &&
      charges?.map((charge) => <DetailCardContent title={charge?.name} subtitle={charge?.value} />)}
  </DetailsCard>
);
