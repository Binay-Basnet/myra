import React, { ReactNode } from 'react';
import { AiFillBank, AiOutlineSetting } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { AddIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';
// import { AiFillBank } from '@react-icons/ai';
import {
  useGetMemberTypesQuery,
  useGetNewIdMutation,
} from '@saccos/myra/graphql';
import { Box, Button, Divider, Icon, Modal, Text } from '@saccos/myra/ui';
import { useRouter } from 'next/router';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const memberColumns = [
  {
    title: 'memberList',
    link: '/members/list',
  },
  {
    title: 'balanceReport',
    link: '/members/reports',
  },
];
// width="full"
// size="lg"
// justifyContent="start"
// leftIcon={<AddIcon h="11px" />}
// onClick={() => {
//   newId
//     .mutateAsync({})
//     .then((res) => router.push(`/members/addMember/${res?.newId}`));
// }}

interface memberTypeButtonProps {
  icon: IconType;
  title: string;
  subtitle: string;
  disabled: boolean;
  onClick: () => void;
}

const MemberTypeButton = (props: memberTypeButtonProps) => {
  const { icon, title, subtitle, disabled, onClick } = props;
  return (
    <Button
      display="flex"
      flexDirection="column"
      variant="outline"
      width={300}
      h={168}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size="xl" as={icon} color="primary.500" />
      <br />
      <Text fontSize="r2" fontWeight="medium">
        {title}
      </Text>
      <br />
      <Text fontSize="s3" textAlign="center">
        {subtitle}
      </Text>
    </Button>
  );
};

const memberTypesArray = {
  INSTITUTION: {
    icon: AiFillBank,
    title: 'Institution',
    subtitle: 'Create KYM form for individual members',
  },
  INDIVIDUAL: {
    icon: IoMdPerson,
    title: 'Individual',
    subtitle: 'Create KYM form for institute members',
  },
  COOPERATIVE: {
    icon: AiFillBank,
    title: 'Cooperative',
    subtitle: 'Create KYM form for cooperative members',
  },
  COOPERATIVE_UNION: {
    icon: AiFillBank,
    title: 'Cooperative Union',
    subtitle: 'Create KYM form for cooperative union members',
  },
};

export const MemberPagesLayout = ({ children }: IMemberPageLayout) => {
  const newId = useGetNewIdMutation();
  const memberTypesQuery = useGetMemberTypesQuery();
  const memberTypes = memberTypesQuery?.data?.members?.memberTypes;
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Member
        </Text>
        <Divider my="s16" />

        <Modal modalButtonProp="New Member" titleProps="Select Member Type">
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            {memberTypes?.map((item) => (
              <MemberTypeButton
                key={item?.id}
                icon={memberTypesArray[item?.type]?.icon}
                title={memberTypesArray[item?.type]?.title}
                subtitle={memberTypesArray[item?.type]?.subtitle}
                disabled={item?.type !== 'INDIVIDUAL'}
                onClick={() => {
                  newId
                    .mutateAsync({})
                    .then((res) => router.push(`/members/add/${res?.newId}`));
                }}
              />
            ))}
          </Grid>
        </Modal>
        <Divider my="s16" />
        <TabColumn list={memberColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/members/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          Member Settings
        </Button>
      </Box>
      <Box p="s16" width="100%" borderRadius="br3">
        <Box bg="white" borderRadius="br3">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
