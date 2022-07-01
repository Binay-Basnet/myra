import { MouseEventHandler, useState } from 'react';
import { AiFillBank, AiOutlineSetting } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { MdCorporateFare } from 'react-icons/md';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';

import {
  useGetMemberTypesQuery,
  useGetNewIdMutation,
} from '@coop/shared/data-access';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Icon,
  Modal,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
    link: '/members/report',
  },
];

interface memberTypeButtonProps {
  icon: IconType;
  title: string;
  subtitle: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const MemberTypeButton = (props: memberTypeButtonProps) => {
  const { icon, title, subtitle, onClick } = props;
  const { t } = useTranslation();
  return (
    <Box
      as="button"
      lineHeight="1.2"
      minWidth={300}
      h={168}
      border="1px"
      px="8px"
      borderRadius="6px"
      onClick={onClick}
      boxShadow={'none'}
      color={'#4b4f56'}
      // _hover={{
      //   bg: '#ebedf0',
      //   color: 'primary.500',
      // }}
      _active={{
        // bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: 'primary.500',
      }}
    >
      <Icon size="xl" as={icon} />
      <br />{' '}
      <Text fontSize="r2" fontWeight="medium">
        {t[title]}{' '}
      </Text>
      <br />{' '}
      <Text fontSize="s3" fontWeight="regular" textAlign="center" px="2px">
        {t[subtitle]}{' '}
      </Text>
    </Box>
  );
};

const memberTypesArray = {
  INDIVIDUAL: {
    icon: IoMdPerson,
    title: 'memberLayoutIndividual',
    subtitle: 'memberLayoutCreateKYMFormForIndividualMembers',
  },
  INSTITUTION: {
    icon: AiFillBank,
    title: 'memberLayoutInstitution',
    subtitle: 'memberLayoutCreateKYMFormForInstituteMembers',
  },

  COOPERATIVE: {
    icon: MdCorporateFare,
    title: 'memberLayoutCooperative',
    subtitle: 'memberLayoutCreateKYMFormForCoOperativeMembers',
  },
  COOPERATIVE_UNION: {
    icon: AiFillBank,
    title: 'memberLayoutCooperativeUnion',
    subtitle: 'memberLayoutCreateKYMFormForCooperativeUnion',
  },
};

export const MemberPagesLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const newId = useGetNewIdMutation();
  const memberTypesQuery = useGetMemberTypesQuery();

  const { t } = useTranslation();

  const memberTypes = memberTypesQuery?.data?.members?.memberTypes?.data;
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex">
      <Box width="275px" p="s24" position="fixed" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['memberLayout']}
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
          {t['memberLayoutNewMember']}
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
              {t['memberLayoutSelectMemberType']}
            </Text>
          }
        >
          <Box py="s16">
            <Grid templateColumns="repeat(2, 1fr)" gap="s16">
              {memberTypes?.[0]?.type?.map((item) => {
                return (
                  <GridItem key={item?.id}>
                    <MemberTypeButton
                      icon={memberTypesArray[item]?.icon}
                      title={memberTypesArray[item]?.title}
                      subtitle={memberTypesArray[item]?.subtitle}
                      onClick={() => {
                        item === 'INDIVIDUAL' &&
                          newId
                            .mutateAsync({})
                            .then((res) =>
                              router.push(
                                `/members/individual/add/${res?.newId}`
                              )
                            );

                        item === 'INSTITUTION' &&
                          newId
                            .mutateAsync({})
                            .then((res) =>
                              router.push(
                                `/members/institution/add/${res?.newId}`
                              )
                            );

                        item === 'COOPERATIVE' &&
                          newId
                            .mutateAsync({})
                            .then((res) =>
                              router.push(
                                `/members/cooperative/add/${res?.newId}`
                              )
                            );
                        item === 'COOPERATIVE_UNION' &&
                          newId
                            .mutateAsync({})
                            .then((res) =>
                              router.push(
                                `/members/cooperative-union/add/${res?.newId}`
                              )
                            );
                      }}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Modal>
        <Divider my="s16" />
        <TabColumn list={memberColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/settings/general/members')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          {t['memberLayoutMemberSettings']}
        </Button>
      </Box>

      <Box
        width="calc(100% - 275px)"
        overflowX="hidden"
        position="relative"
        left="275px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
