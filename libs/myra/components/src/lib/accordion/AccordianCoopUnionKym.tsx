import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Text } from '@chakra-ui/react';

import {
  KymInsAddSectionStatus,
  useGetAccountOperatorDetailsListQuery,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetCooperativeUnionKymEditDataQuery,
} from '@coop/cbs/data-access';
import { Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const OrganizationInformation = [
  'kymCoopUnionAccBasicInformation',
  'kymCoopUnionAccRegisteredDetails',
  'kymCoopUnionAccOperatingOfficeAddress',
  'serviceCenterOfficeAddress',
  'kymCoopUnionAccContactDetails',
  'kymCoopUnionAccBankAccountDetails',
  'kymCoopUnionAccApplicant',
  'kymCoopUnionAccCooperativeMemberInformation',
];
const DirectorDetails = ['kymCoopUnionAccDetailsofProprietor'];
const AccountOperators = ['kymCoopUnionAccDetailsofAccountOperators'];
const CentralRepresentative = [
  'kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms',
];
// const memberDetails = [
//   'kymCoopUnionAccCurrentMembers',
//   'kymCoopUnionAccTargetfornextfiscalyear',
// ];
const EconomicDetails = [
  'kymCoopUnionAccAssets',
  'kymCoopUnionAccEquityandLiailibities',
  'kymCoopUnionAccIncomeDetails',
  'kymCoopUnionAccExpenseDetails',
];
const Declaration = [
  'kymCoopUnionAccDocumentsDeclaration',
  'kymCoopUnionAccAccountHolderDeclaration',
];

interface AccordianProps {
  formStatus?: KymInsAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

const cooperativeInfoObject = {
  kymCoopUnionAccBasicInformation: 'BASIC_INFORMATION',
  kymCoopUnionAccRegisteredDetails: 'REGISTERED_DETAILS',
  kymCoopUnionAccOperatingOfficeAddress: 'OPERATING_OFFICE_ADDRESS',
  serviceCenterOfficeAddress: 'SERVICE_CENTER_OFFICE',
  kymCoopUnionAccContactDetails: 'CONTACT_DETAILS',
  kymCoopUnionAccBankAccountDetails: 'ANK_ACCOUNT_DETAILS',
  kymCoopUnionAccApplicant: 'APPLICANT',
};

export function AccorrdianAddCOOPUnion(props: AccordianProps) {
  const { t } = useTranslation();
  const { kymCurrentSection } = props;
  const route = useRouter();
  const id = route?.query['id'] as string;
  const { data: coopUnionCooperativeData } =
    useGetCooperativeUnionKymEditDataQuery({
      id,
    });
  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery({
    id: String(id),
  });

  const { data: accountOperatorValues } = useGetAccountOperatorDetailsListQuery(
    {
      id: String(id),
    }
  );

  const cooperativeInfo =
    coopUnionCooperativeData?.members?.cooperativeUnion?.formState?.formData
      ?.institutionInformation?.sectionStatus;

  const bodInfo =
    bodEditValues?.members?.cooperativeUnion?.formState?.formData
      ?.boardOfDirectorsDetails?.sectionStatus;

  const getBodInfoStatus = () => {
    let bodStatus = false;
    bodInfo?.forEach((item) => {
      if (item?.errors === null && item?.incomplete === null) {
        bodStatus = true;
      } else {
        bodStatus = false;
      }
    });
    return bodStatus;
  };
  const accountOperatorDetails =
    accountOperatorValues?.members?.cooperativeUnion?.formState?.formData
      ?.accountOperatorsDetails?.sectionStatus;

  const getAccountOperatorStatus = () => {
    let accountOperatorStatus = false;
    accountOperatorDetails?.forEach((item) => {
      if (item?.errors === null && item?.incomplete === null) {
        accountOperatorStatus = true;
      } else {
        accountOperatorStatus = false;
      }
    });
    return accountOperatorStatus;
  };

  const cooperativeInfoIncompleteSections = cooperativeInfo?.incomplete?.map(
    (item) => item?.sectionName
  );

  const cooperativeInfoSectionsWithError = cooperativeInfo?.errors?.map(
    (item) => item?.sectionName
  );

  const subsection = kymCurrentSection?.subSection;
  const [isOpenOrganizational, setIsOpenOrganizational] = React.useState(false);
  const [isopenDirector, setIsopenDirector] = React.useState(false);
  // const [isOpenmemberDetails, setIsOpenMemberDetails] = React.useState(false);
  const [isOpenEconmoicDetails, setIsOpenEconomicDetails] =
    React.useState(false);
  const [isopenAccountOperators, setIsopenAccountOperators] =
    React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);
  const [isopenCentralRepresentatives, setIsopenCentralRepresentatives] =
    React.useState(false);

  React.useEffect(() => {
    const section = kymCurrentSection?.section;

    setIsOpenOrganizational(section === 'organizationInfo');
    setIsopenDirector(section === 'directorDetails');
    setIsopenAccountOperators(section === 'accountOperators');
    setIsOpenDeclaration(section === 'declaration');
    setIsopenCentralRepresentatives(section === 'centralRepresentatives');
    // setIsOpenMemberDetails(section === 'memberDetails');
    setIsOpenEconomicDetails(section === 'economicDetails');
  }, [kymCurrentSection]);

  return (
    <Box overflow="auto" h="700px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganizational(!isOpenOrganizational)}
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc1InstitutionInformation']}
        </Text>
        {!isOpenOrganizational ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenOrganizational} style={{ marginTop: '0px' }}>
        <Box display={'flex'} flexDirection="column">
          {OrganizationInformation.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              &nbsp; &nbsp;
              {cooperativeInfoIncompleteSections?.includes(
                cooperativeInfoObject[item]
              ) ||
              cooperativeInfoSectionsWithError?.includes(
                cooperativeInfoObject[item]
              ) ? (
                <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />
              ) : (
                <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsopenDirector(!isopenDirector)}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc2Detailsofdirectorsboardmemberspartners']}
        </Text>
        {!isopenDirector ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isopenDirector}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {DirectorDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              &nbsp; &nbsp;
              {getBodInfoStatus() ? (
                <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />
              ) : (
                <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsopenAccountOperators(!isopenAccountOperators)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc3AccountOperators']}
        </Text>
        {!isopenAccountOperators ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isopenAccountOperators}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {AccountOperators.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
              gap={2}
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              {getAccountOperatorStatus() ? (
                <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />
              ) : (
                <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() =>
          setIsopenCentralRepresentatives(!isopenCentralRepresentatives)
        }
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc4DetailsofCentralRepresentative']}
        </Text>
        {!isopenCentralRepresentatives ? (
          <ChevronRightIcon />
        ) : (
          <ChevronDownIcon />
        )}
      </Box>

      <Collapse in={isopenCentralRepresentatives}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {CentralRepresentative.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsOpenMemberDetails(!isOpenmemberDetails)}
        cursor="pointer"

        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc5Detailsofmember']}
        </Text>
        {!isOpenmemberDetails ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenmemberDetails}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {memberDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}

              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsOpenEconomicDetails(!isOpenEconmoicDetails)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc6EconomicDetails']}
        </Text>
        {!isOpenEconmoicDetails ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenEconmoicDetails}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {EconomicDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsOpenDeclaration(!isOpenDeclaration)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc7Declaration']}
        </Text>
        {!isOpenDeclaration ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {Declaration.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
