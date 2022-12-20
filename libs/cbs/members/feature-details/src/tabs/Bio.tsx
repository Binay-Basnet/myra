import { IoCreateOutline, IoEyeOutline, IoPrintOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';

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

// const links = [
//   {
//     icon: IoCreateOutline,
//     title: 'Edit KYM',
//   },
//   {
//     icon: IoEyeOutline,
//     title: 'View KYM',
//   },
//   {
//     icon: IoPrintOutline,
//     title: 'Print KYM',
//   },
// ];
export const Bio = () => {
  const router = useRouter();
  const memberDetailsData = useGetMemberOverviewBasicDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberIndividual =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsData?.data?.members?.memberOverview?.data?.overview?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverview?.data?.overview
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

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Bio{' '}
      </Text>

      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
            cursor="pointer"
            onClick={() => {
              router.push(`/members/${memberType}/edit/${router.query['id'] as string}`);
            }}
          >
            <Icon as={IoCreateOutline} />

            <Text fontWeight="500" fontSize="s3">
              Edit KYM
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
          >
            <Icon as={IoEyeOutline} />

            <Text fontWeight="500" fontSize="s3">
              View KYM{' '}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
          >
            <Icon as={IoPrintOutline} />

            <Text fontWeight="500" fontSize="s3">
              Print KYM{' '}
            </Text>
          </Box>
        </Grid>
      </Box>
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
