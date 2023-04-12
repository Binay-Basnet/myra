// import { AddAccount } from '../Tree/LeafNode';
import { useMemo } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, DetailCardContent, DetailsCard, Grid, Icon, Text } from '@myra-ui';

import { useGetCommitteeListQuery, useGetCommitteeMemberListQuery } from '@coop/cbs/data-access';
import { localizedText, ROUTES } from '@coop/cbs/utils';

import { AddMembersModal } from '../components/AddMemberModal';
import { EditCommitteeModal } from '../components/AddNewCommiteeModal';
import { MemberListTableCommitte } from '../components/MemberListCommitteeTable';

export const OverViewTab = () => {
  const router = useRouter();
  const id = router?.query?.['id'];
  const { data } = useGetCommitteeListQuery();
  const rowData = useMemo(() => data?.settings?.general?.organization?.committee ?? [], [data]);

  const detailData = rowData?.find((d) => d?.id === id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: OnCloseEdit } = useDisclosure();

  const committeeMemberList = useGetCommitteeMemberListQuery({
    committeeID: id as string,
  });

  const committeeMemberData =
    committeeMemberList?.data?.settings?.general?.organization?.committeeMembers?.slice(0, 5);

  const memberData =
    committeeMemberData?.map((item, index) => ({
      sn: Number(index) + 1,
      name: localizedText(item?.member?.name),
      dateJoined: item?.member?.dateJoined,
      position: item?.position,
      contact: item?.member?.contact,
    })) || [];

  return (
    <>
      {' '}
      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize="r3" fontWeight="600">
          Overview
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s20">
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
            boxShadow="E0"
            onClick={() => onOpenEdit()}
          >
            <Icon color="primary.500" as={IoAddOutline} />

            <Text fontWeight="500" fontSize="s3">
              Edit Committee Details
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
            cursor="pointer"
            boxShadow="E0"
            onClick={() => onOpen()}
          >
            <Icon color="primary.500" as={IoAddOutline} />

            <Text fontWeight="500" fontSize="s3">
              Add New Members
            </Text>
          </Box>
        </Grid>
        <DetailsCard title="Description" bg="white" hasTable>
          {/* <DetailCardContent title="Full Name" subtitle={bioDataInd?.memberName} />
          <DetailCardContent title="Gender" subtitle={bioDataInd?.gender?.local} /> */}
          <Text>{detailData?.description}</Text>
        </DetailsCard>
        <DetailsCard title="General Information" bg="white">
          <DetailCardContent title="Committee Name" subtitle={detailData?.name} />
          <DetailCardContent title="Committee Code" subtitle={detailData?.code} />
          {/* <DetailCardContent title="Created Date" subtitle={bioDataInd?.gender?.local} /> */}

          <DetailCardContent title="Total Members" subtitle={detailData?.memberCount} />

          <DetailCardContent title="Tenure" subtitle={`${detailData?.tenure} months`} />
        </DetailsCard>
        <DetailsCard
          title="Members"
          hasTable
          leftBtn={
            <Button
              variant="ghost"
              size="md"
              onClick={() =>
                router.push(`${ROUTES.SETTINGS_GENERAL_COMMITTEE_DETAILS}?id=${id}&tab=members`)
              }
            >
              View All Members
            </Button>
          }
        >
          <MemberListTableCommitte data={memberData} />{' '}
        </DetailsCard>
      </Box>
      <AddMembersModal isOpen={isOpen} onClose={onClose} />
      <EditCommitteeModal isOpen={isOpenEdit} onClose={OnCloseEdit} />
    </>
  );
};
