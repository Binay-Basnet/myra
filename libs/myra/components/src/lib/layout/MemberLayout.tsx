import React, { useState } from 'react';
import { AiFillBank, AiOutlineSetting } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { AddIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';
import {
  useGetMemberTypesQuery,
  useGetNewIdMutation,
} from '@saccos/myra/graphql';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Icon,
  Modal,
  Text,
} from '@saccos/myra/ui';
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
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      width={300}
      h={168}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Icon size="xl" as={icon} color="primary.500" />
        <br />
        <Text fontSize="r2" fontWeight="medium">
          {title}
        </Text>
        <br />
        <Text fontSize="s3">{subtitle}</Text>
      </Box>
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
    subtitle: 'Create KYM form for cooperative union',
  },
};

export const MemberPagesLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const newId = useGetNewIdMutation();
  const memberTypesQuery = useGetMemberTypesQuery();
  const memberTypes = memberTypesQuery?.data?.members?.memberTypes;
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Member
        </Text>
        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            onOpenModal();
          }}
        >
          New Member
        </Button>

        <Modal
          open={openModal}
          onClose={onCloseModal}
          isCentered={true}
          title={
            <Text
              fontSize="r2"
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
            >
              Select Member Type
            </Text>
          }
        >
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            {memberTypes?.map((item) => {
              if (!item?.type) {
                return null;
              }
              return (
                <GridItem key={item?.id}>
                  <MemberTypeButton
                    icon={memberTypesArray[item.type]?.icon}
                    title={memberTypesArray[item.type]?.title}
                    subtitle={memberTypesArray[item.type]?.subtitle}
                    disabled={item?.type !== 'INDIVIDUAL'}
                    onClick={() => {
                      newId
                        .mutateAsync({})
                        .then((res) =>
                          router.push(`/members/add/${res?.newId}`)
                        );
                    }}
                  />
                </GridItem>
              );
            })}
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

      <Box p="s16" width="100%" overflowX="hidden">
        <Box bg="white" borderRadius="br3" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
