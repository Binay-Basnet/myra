import React, { MouseEventHandler, useState } from 'react';
import { AiFillBank, AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import { IoMdPerson } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { MdCorporateFare } from 'react-icons/md';
import { TbLayersUnion } from 'react-icons/tb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';

import { Box, Button, Divider, GridItem, Icon, Modal, SettingsButton, Text } from '@myra-ui';

import {
  Id_Type,
  useGetGeneralMemberSettingsDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { TabColumn } from '@coop/myra/components';
import { featureCode, useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const memberColumns = [
  {
    title: 'memberList',
    link: ROUTES.CBS_MEMBER_LIST,
  },
];

const settingsColumn = [
  {
    label: 'memberLayoutMemberSettings',
    navigate: ROUTES.SETTINGS_GENERAL_MEMBERS,
  },
  // {
  //   label: 'memberLayoutKymSettings',
  //   navigate: '/cbs/settings/general/members/kym-individual',
  // },
];

const reportColumn = [
  {
    label: 'memberLayoutMemberClassification',
    navigate: '/cbs/reports/cbs/members/classification/new',
  },
  // {
  //   label: 'memberLayoutMemberLedger',
  // },
  // {
  //   label: 'memberLayoutIndividualReport',
  // },
  {
    label: 'memberLayoutActiveInactiveMemberReport',
    navigate: '/cbs/reports/cbs/members/activations/new',
  },
  // {
  //   label: 'memberLayoutInactiveMemberReport',
  //   navigate: '/cbs/reports/cbs/members/activations/new',
  // },
  {
    label: 'memberLayoutKymStatusReport',
    navigate: '/cbs/reports/cbs/members/kym-status/new',
  },
];

interface MemberTypeButtonProps {
  icon: IconType;
  title: string;
  subtitle: string;
  featCode: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

type MemberType = 'INDIVIDUAL' | 'INSTITUTION' | 'COOPERATIVE' | 'COOPERATIVE_UNION';

enum MemberTypeSlug {
  individual = 'INDIVIDUAL',
  institution = 'INSTITUTION',
  cooperative = 'COOPERATIVE',
  cooperative_union = 'COOPERATIVE_UNION',
}

const MemberTypeButton = (props: MemberTypeButtonProps) => {
  const { icon, title, featCode, subtitle, onClick } = props;
  const { t } = useTranslation();
  return (
    <Box
      as="button"
      lineHeight="1.2"
      width={310}
      h={168}
      border="1px"
      px="8px"
      borderRadius="6px"
      onClick={onClick}
      boxShadow="none"
      color="neutralColorLight.Gray-60"
      _hover={{
        color: 'primary.500',
      }}
      _active={{
        // bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: 'primary.500',
      }}
    >
      <Icon size="xl" as={icon} />
      <br />
      <Text fontSize="r2" fontWeight="medium" color="neutralColorLight.Gray-80">
        {t[title]} - {featCode}
      </Text>
      <br />
      <Text
        fontSize="s3"
        fontWeight="regular"
        textAlign="center"
        px="2px"
        color="neutralColorLight.Gray-80"
      >
        {t[subtitle]}
      </Text>
    </Box>
  );
};

export const MemberPagesLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const newId = useGetNewIdMutation();

  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const memberTypeRedirect = (item: MemberType) => {
    if (item === 'INDIVIDUAL') {
      newId
        .mutateAsync({ idType: Id_Type.Kymindividual })
        .then((res) => router.push(`${ROUTES.CBS_MEMBER_IND_ADD}/${res?.newId}`));
    } else if (item === 'INSTITUTION') {
      newId
        .mutateAsync({ idType: Id_Type.Kyminstitutions })
        .then((res) => router.push(`${ROUTES.CBS_MEMBER_INS_ADD}/${res?.newId}`));
    } else if (item === 'COOPERATIVE') {
      newId
        .mutateAsync({ idType: Id_Type.Kymcooperative })
        .then((res) => router.push(`${ROUTES.CBS_MEMBER_COOP_ADD}/${res?.newId}`));
    } else {
      newId
        .mutateAsync({
          idType: Id_Type.Kymcooperativeunion,
        })
        .then((res) => router.push(`${ROUTES.CBS_MEMBER_COOP_UNION_ADD}/${res?.newId}`));
    }
  };

  const { data: editValues } = useGetGeneralMemberSettingsDataQuery(
    {},
    {
      staleTime: 0,
    }
  );

  const memberListQuery =
    editValues?.settings?.general?.KYM?.general?.generalMember?.record?.memberType;

  const memberTypesArray = {
    INDIVIDUAL: {
      icon: IoMdPerson,
      featureCode: featureCode?.newMemberIndividual,
      title: 'memberLayoutIndividual',
      subtitle: 'memberLayoutCreateKYMFormForIndividualMembers',
      display: memberListQuery?.individual,
    },
    INSTITUTION: {
      icon: AiFillBank,
      featureCode: featureCode?.newMemberInstitution,
      title: 'memberLayoutInstitution',
      subtitle: 'memberLayoutCreateKYMFormForInstituteMembers',
      display: memberListQuery?.institution,
    },

    COOPERATIVE: {
      icon: MdCorporateFare,
      featureCode: featureCode?.newMemberCooperative,
      title: 'memberLayoutCooperative',
      subtitle: 'memberLayoutCreateKYMFormForCoOperativeMembers',
      display: memberListQuery?.cooperative,
    },
    COOPERATIVE_UNION: {
      icon: TbLayersUnion,
      featureCode: featureCode?.newMemberCooperativeUnion,
      title: 'memberLayoutCooperativeUnion',
      subtitle: 'memberLayoutCreateKYMFormForCooperativeUnion',
      display: memberListQuery?.cooperativeUnion,
    },
  };

  const MemberTypeFunctionButton = ({ type }: { type: MemberType }) => (
    <MemberTypeButton
      icon={memberTypesArray[type]?.icon}
      title={memberTypesArray[type]?.title}
      featCode={memberTypesArray[type]?.featureCode}
      subtitle={memberTypesArray[type]?.subtitle}
      onClick={() => memberTypeRedirect(type as MemberType)}
    />
  );

  return (
    <Box display="flex">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
        position="fixed"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          py="s16"
          pb="s8"
          justifyContent="center"
          gap="s2"
          px="s16"
        >
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            {t['corebankingSystems']}
          </Text>

          <Link href="/members/list">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['memberLayout']}
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          <Button
            width="full"
            size="md"
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
            isCentered
            width="2xl"
            title={
              <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
                {t['memberLayoutSelectMemberType']}
              </Text>
            }
          >
            <Box py="s16">
              <Grid templateColumns="repeat(2, 1fr)" gap="s16">
                {memberListQuery?.individual && (
                  <GridItem>
                    <MemberTypeFunctionButton type={MemberTypeSlug?.individual} />
                  </GridItem>
                )}
                {memberListQuery?.institution && (
                  <GridItem>
                    <MemberTypeFunctionButton type={MemberTypeSlug?.institution} />
                  </GridItem>
                )}
                {memberListQuery?.cooperative && (
                  <GridItem>
                    <MemberTypeFunctionButton type={MemberTypeSlug?.cooperative} />
                  </GridItem>
                )}
                {memberListQuery?.cooperativeUnion && (
                  <GridItem>
                    <MemberTypeFunctionButton type={MemberTypeSlug?.cooperative_union} />
                  </GridItem>
                )}
              </Grid>
            </Box>
          </Modal>

          <Divider my="s16" />
          <TabColumn list={memberColumns} />
          <Divider my="s16" />
          {settingsColumn.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportColumn.map((item) => (
            <SettingsButton
              onClick={() => item?.navigate && router.push(item?.navigate)}
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label]}
            />
          ))}
        </Box>
      </Box>
      <Box width="calc(100% - 260px)" ml="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
