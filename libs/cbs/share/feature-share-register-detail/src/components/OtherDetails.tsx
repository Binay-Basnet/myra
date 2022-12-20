import { DetailCardContent, DetailsCard } from '@myra-ui';

type OtherDataProps = {
  txnBranch: string | null | undefined;
  teller: string | null | undefined;
};

export const OtherDetails = ({ txnBranch, teller }: OtherDataProps) => (
  <DetailsCard title="Other Details">
    <DetailCardContent title="Transaction Branch" subtitle={txnBranch} />
    <DetailCardContent title="Teller" subtitle={teller} />
  </DetailsCard>
);
