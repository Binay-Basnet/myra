import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const STRAccountDetails = () => {
  const { strAccountDetails } = useSTRDetails();

  return (
    <DetailsCard title="Account Details (STR)" hasThreeRows>
      <DetailCardContent title="Account Number" subtitle={strAccountDetails?.id} />
      <DetailCardContent title="Nature of Account" subtitle={strAccountDetails?.natureOfAccount} />
      <DetailCardContent
        title="Nature of Ownership"
        subtitle={strAccountDetails?.natureOfOwnership}
      />
      <DetailCardContent
        title="Account Opening Date"
        subtitle={localizedDate(strAccountDetails?.accountOpenDate)}
      />
    </DetailsCard>
  );
};
