import { IoCreateOutline, IoEyeOutline, IoPrintOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, GridItem, QuickLinks, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import {
  BioCoop,
  BioCoopUnion,
  BioInstitution,
  DocumentInd,
  MemberAddressInfo,
  MemberBasicInfo,
  MemberContactInfo,
  MemberFamilyInfo,
  MemberFamilyRelationsInfo,
} from '../components';

export const Bio = () => {
  const router = useRouter();
  const { id } = router.query;
  const memberDetailsData = useGetMemberKymDetailsOverviewQuery({
    id: id as string,
  });

  const memberIndividual =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  let memberType = 'individual';
  if (memberIndividual) {
    memberType = 'individual';
  } else if (memberBasicInstitution) {
    memberType = 'institution';
  } else if (memberBasicCooperative) {
    memberType = 'coop';
  } else if (memberBasicCooperativeUnion) {
    memberType = 'coop_union';
  } else {
    memberType = 'individual';
  }

  const links = [
    {
      id: '1',
      text: 'Edit KYM',
      icon: IoCreateOutline,
      onclick: () => router.push(`${ROUTES.CBS_MEMBER}/${memberType}/edit/${id}`),
    },
    {
      id: '2',
      text: 'View KYM',
      icon: IoEyeOutline,
      onclick: () => router.push(`${ROUTES.CBS_MEMBER}/${memberType}/edit/${id}`),
    },
    {
      id: '3',
      text: 'Print KYM',
      icon: IoPrintOutline,
      onclick: () => router.push(`${ROUTES.CBS_MEMBER}/${memberType}/edit/${id}`),
    },
  ];

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Bio{' '}
      </Text>
      <Grid templateColumns="repeat(3,1fr)" columnGap="s8" rowGap="s16">
        {links?.map((item) => (
          <GridItem key={item?.text}>
            <QuickLinks icon={item.icon} text={item.text} onclick={item.onclick} />
          </GridItem>
        ))}
      </Grid>

      {memberIndividual && (
        <Box display="flex" flexDirection="column" gap="s16">
          <MemberBasicInfo />
          <MemberContactInfo />
          <MemberAddressInfo />
          <MemberFamilyInfo />
          <MemberFamilyRelationsInfo />
          <DocumentInd />
        </Box>
      )}
      {memberBasicInstitution && <BioInstitution />}
      {memberBasicCooperative && <BioCoop />}
      {memberBasicCooperativeUnion && <BioCoopUnion />}
    </>
  );
};
