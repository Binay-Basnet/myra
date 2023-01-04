import { DetailCardContent, DetailsCard, GridItem, Text } from '@myra-ui';

import { localizedDate, localizedText } from '@coop/cbs/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const MemberDocuments = () => {
  const { memberDetails } = useSTRDetails();

  const identificationLabels: Record<string, string> = {
    citizenship: 'Citizenship',
    drivingLicense: 'Driving License',
    passport: 'Passport',
    voterCard: 'Voter Card',
    nationalId: 'National ID',
  };

  return (
    <DetailsCard title="Personal Document Detail" hasThreeRows>
      {memberDetails?.identificationDetail?.map((identification, index) => (
        <>
          <GridItem
            colSpan={3}
            fontSize="r1"
            fontWeight={600}
            color="gray.800"
            display="flex"
            gap="s4"
          >
            <Text>{String(index + 1)}.</Text>
            <Text>{identificationLabels[identification?.idType as string]}</Text>
          </GridItem>
          <DetailCardContent title="Document No" subtitle={identification?.idNo ?? 'N/A'} />
          <DetailCardContent title="Issued Date" subtitle={localizedDate(identification?.date)} />
          <DetailCardContent
            title="Issued Place"
            subtitle={localizedText(identification?.place) ?? 'N/A'}
          />
        </>
      ))}
    </DetailsCard>
  );
};
