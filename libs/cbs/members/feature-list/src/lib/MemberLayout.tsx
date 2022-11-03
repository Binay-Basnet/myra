import { MouseEventHandler, useState } from 'react';
import { AiFillBank, AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import { IoMdPerson } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { MdCorporateFare } from 'react-icons/md';
import { TbLayersUnion } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/react';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { TabColumn } from '@coop/myra/components';
import { Box, Button, Divider, GridItem, Icon, Modal, SettingsButton, Text } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const memberColumns = [
  {
    title: 'memberList',
    link: '/members/list',
  },
];

const settingsColumn = [
  {
    label: 'memberLayoutMemberSettings',
    navigate: '/settings/general/members',
  },
  {
    label: 'memberLayoutKymSettings',
    navigate: '/settings/general/members/kym-individual',
  },
];

const reportColumn = [
  {
    label: 'memberLayoutMemberClassification',
    navigate: '/settings/general/members',
  },
  {
    label: 'memberLayoutMemberLedger',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'memberLayoutIndividualReport',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'memberLayoutActiveInactiveMemberReport',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'memberLayoutInactiveMemberReport',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'memberLayoutKymStatusReport',
    navigate: '/settings/general/members/kym-individual',
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

const memberTypesArray = {
  INDIVIDUAL: {
    icon: IoMdPerson,
    featureCode: featureCode?.newMemberIndividual,
    title: 'memberLayoutIndividual',
    subtitle: 'memberLayoutCreateKYMFormForIndividualMembers',
  },
  INSTITUTION: {
    icon: AiFillBank,
    featureCode: featureCode?.newMemberInstitution,
    title: 'memberLayoutInstitution',
    subtitle: 'memberLayoutCreateKYMFormForInstituteMembers',
  },

  COOPERATIVE: {
    icon: MdCorporateFare,
    featureCode: featureCode?.newMemberCooperative,
    title: 'memberLayoutCooperative',
    subtitle: 'memberLayoutCreateKYMFormForCoOperativeMembers',
  },
  COOPERATIVE_UNION: {
    icon: TbLayersUnion,
    featureCode: featureCode?.newMemberCooperativeUnion,
    title: 'memberLayoutCooperativeUnion',
    subtitle: 'memberLayoutCreateKYMFormForCooperativeUnion',
  },
};

export const MemberPagesLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const newId = useGetNewIdMutation();

  // const memberTypesQuery = useGetMemberTypesQuery();

  const { t } = useTranslation();

  // const memberTypes =i memberTypesQuery?.data?.members?.memberTypes?.data;
  // memberTypes?.[0]?.type?
  const memberTypes = ['INDIVIDUAL', 'INSTITUTION', 'COOPERATIVE', 'COOPERATIVE_UNION'];

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
        .then((res) => router.push(`/members/individual/add/${res?.newId}`));
    } else if (item === 'INSTITUTION') {
      newId
        .mutateAsync({ idType: Id_Type.Kyminstitutions })
        .then((res) => router.push(`/members/institution/add/${res?.newId}`));
    } else if (item === 'COOPERATIVE') {
      newId
        .mutateAsync({ idType: Id_Type.Kymcooperative })
        .then((res) => router.push(`/members/coop/add/${res?.newId}`));
    } else {
      newId
        .mutateAsync({
          idType: Id_Type.Kymcooperativeunion,
        })
        .then((res) => router.push(`/members/coop_union/add/${res?.newId}`));
    }
  };

  return (
    <Box display="flex">
      <Box width="260px" position="fixed" flexShrink={0}>
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['memberLayout']}
          </Text>
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
            title={
              <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
                {t['memberLayoutSelectMemberType']}
              </Text>
            }
          >
            <Box py="s16">
              <Grid templateColumns="repeat(2, 1fr)" gap="s16">
                {/* {memberTypes?.[0]?.type?.map((item, index) => { */}
                {memberTypes?.map((item) => {
                  if (!item) {
                    return null;
                  }
                  const dataItem = item as keyof typeof memberTypesArray;

                  return (
                    <GridItem key={item}>
                      <MemberTypeButton
                        icon={memberTypesArray[dataItem]?.icon}
                        title={memberTypesArray[dataItem]?.title}
                        featCode={memberTypesArray[dataItem]?.featureCode}
                        subtitle={memberTypesArray[dataItem]?.subtitle}
                        onClick={() => memberTypeRedirect(item as MemberType)}
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
          {settingsColumn.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportColumn.map((item) => (
            <SettingsButton icon={CgLoadbarDoc} buttonLabel={t[item?.label]} />
          ))}
        </Box>
      </Box>
      <Box w="100%" ml="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
