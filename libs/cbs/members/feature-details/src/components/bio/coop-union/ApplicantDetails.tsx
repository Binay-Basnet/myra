import { useRouter } from 'next/router';

import { Box, DetailCardContent, DetailsCard, Divider, Grid } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

import { DocumentComponent } from '../components/Documents';

export const AppicantDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.applicantDetails
      : null;

  return (
    <DetailsCard title="Representative Details" bg="white" hasTable>
      <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
        <DetailCardContent title="Name" subtitle={bioDataCoop?.name} />
        <DetailCardContent title="Degisnation" subtitle={bioDataCoop?.designation} />
        <DetailCardContent title="Contact Number" subtitle={bioDataCoop?.contactNo} />
        <DetailCardContent title="Email" subtitle={bioDataCoop?.email} />
        <DetailCardContent title="Pan No." subtitle={bioDataCoop?.panNo} />

        <DetailCardContent title="Province" subtitle={bioDataCoop?.address?.state?.local} />
        <DetailCardContent title="District" subtitle={bioDataCoop?.address?.district?.local} />
        <DetailCardContent
          title="Local Government"
          subtitle={bioDataCoop?.address?.localGovernment?.local}
        />
        <DetailCardContent title="Ward No" subtitle={bioDataCoop?.address?.wardNo} />
        <DetailCardContent title="Locality" subtitle={bioDataCoop?.address?.locality?.local} />
        <DetailCardContent title="House No" subtitle={bioDataCoop?.address?.houseNo} />
      </Grid>
      <Box display="flex" flexDirection="column" gap="s16">
        <Divider />
        <Grid templateColumns="repeat(2,1fr)" gap="s20">
          {bioDataCoop?.docs?.map((docs) => (
            <DocumentComponent
              keyText={docs?.key as string}
              value={docs?.value as string}
              key={docs?.value}
            />
          ))}
        </Grid>
      </Box>
    </DetailsCard>
  );
};
