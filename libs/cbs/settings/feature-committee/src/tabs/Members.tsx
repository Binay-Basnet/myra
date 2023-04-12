// import { AddAccount } from '../Tree/LeafNode';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailsCard, Grid, Icon, Text } from '@myra-ui';

import { useGetCommitteeMemberListQuery } from '@coop/cbs/data-access';
import { localizedText } from '@coop/cbs/utils';

import { AddMembersModal } from '../components/AddMemberModal';
import { MemberListTableCommitte } from '../components/MemberListCommitteeTable';

export const CommitteeMembersTab = () => {
  const router = useRouter();
  const id = router?.query?.['id'];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const committeeMemberList = useGetCommitteeMemberListQuery({
    committeeID: id as string,
  });

  const committeeMemberData =
    committeeMemberList?.data?.settings?.general?.organization?.committeeMembers;

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
          Members
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
            onClick={() => onOpen()}
          >
            <Icon color="primary.500" as={IoAddOutline} />

            <Text fontWeight="500" fontSize="s3">
              Add New Members
            </Text>
          </Box>
        </Grid>

        <DetailsCard title="Members" hasTable>
          <MemberListTableCommitte data={memberData} />{' '}
        </DetailsCard>
      </Box>
      <AddMembersModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
