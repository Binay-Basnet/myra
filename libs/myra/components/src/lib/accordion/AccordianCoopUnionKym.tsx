import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Text } from '@chakra-ui/react';

import { KymInsAddSectionStatus } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

// import { useGetSectionStatus } from '../hooks/useGetSectionStatus';

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

// const cooperativeInfoObject: Record<typeof OrganizationInformation[0], string> =
//   {
//     kymCoopUnionAccBasicInformation: 'BASIC_INFORMATION',
//     kymCoopUnionAccRegisteredDetails: 'REGISTERED_DETAILS',
//     kymCoopUnionAccOperatingOfficeAddress: 'OPERATING_OFFICE_ADDRESS',
//     serviceCenterOfficeAddress: 'SERVICE_CENTER_OFFICE',
//     kymCoopUnionAccContactDetails: 'CONTACT_DETAILS',
//     kymCoopUnionAccBankAccountDetails: 'ANK_ACCOUNT_DETAILS',
//     kymCoopUnionAccApplicant: 'APPLICANT',
//   };

export function AccorrdianAddCOOPUnion(props: AccordianProps) {
  const { t } = useTranslation();
  const { section = '', subSection = '' } = props.kymCurrentSection || {};
  // const route = useRouter();
  // const id = route?.query['id'] as string;
  // const {
  //   getBodInfoStatus,
  //   getAccountOperatorStatus,
  //   cooperativeInfoIncompleteSections,
  //   cooperativeInfoSectionsWithError,
  //   cooperativeInfo,
  // } = useGetSectionStatus(id);

  const [isOpenOrganizational, setIsOpenOrganizational] = useState(false);
  const [isOpenDirector, setIsOpenDirector] = useState(false);
  const [isOpenEconomicDetails, setIsOpenEconomicDetails] = useState(false);
  const [isOpenAccountOperators, setIsOpenAccountOperators] = useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = useState(false);
  const [isOpenCentralRepresentatives, setIsOpenCentralRepresentatives] =
    useState(false);

  useEffect(() => {
    setIsOpenOrganizational(section === 'organizationInfo');
    setIsOpenDirector(section === 'directorDetails');
    setIsOpenAccountOperators(section === 'accountOperators');
    setIsOpenDeclaration(section === 'declaration');
    setIsOpenCentralRepresentatives(section === 'centralRepresentatives');
    setIsOpenEconomicDetails(section === 'economicDetails');
  }, [section]);

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
              bg={subSection === item ? 'background.500' : 'gray.0'}
              py="s8"
              gap={2}
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              {/* {cooperativeInfo ===*/}
              {/* undefined ? null : cooperativeInfoIncompleteSections?.includes(*/}
              {/*    cooperativeInfoObject[item]*/}
              {/*  ) ||*/}
              {/*  cooperativeInfoSectionsWithError?.includes(*/}
              {/*    cooperativeInfoObject[item]*/}
              {/*  ) ? (*/}
              {/*  <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />*/}
              {/* ) : (*/}
              {/*  <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />*/}
              {/* )}*/}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenDirector(!isOpenDirector)}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc2Detailsofdirectorsboardmemberspartners']}
        </Text>
        {!isOpenDirector ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenDirector}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {DirectorDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subSection === item ? 'background.500' : 'gray.0'}
              py="s8"
              gap={2}
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              {/* {getBodInfoStatus() === null ? null : getBodInfoStatus() ? (*/}
              {/*  <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />*/}
              {/* ) : (*/}
              {/*  <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />*/}
              {/* )}*/}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsOpenAccountOperators(!isOpenAccountOperators)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc3AccountOperators']}
        </Text>
        {!isOpenAccountOperators ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenAccountOperators}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {AccountOperators.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subSection === item ? 'background.500' : 'gray.0'}
              py="s8"
              gap={2}
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              {/* {getAccountOperatorStatus() ===*/}
              {/* null ? null : getAccountOperatorStatus() ? (*/}
              {/*  <Icon size="sm" as={BsCheckCircleFill} color="primary.500" />*/}
              {/* ) : (*/}
              {/*  <Icon size="sm" as={AiFillCloseCircle} color="danger.500" />*/}
              {/* )}*/}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() =>
          setIsOpenCentralRepresentatives(!isOpenCentralRepresentatives)
        }
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc4DetailsofCentralRepresentative']}
        </Text>
        {!isOpenCentralRepresentatives ? (
          <ChevronRightIcon />
        ) : (
          <ChevronDownIcon />
        )}
      </Box>

      <Collapse in={isOpenCentralRepresentatives}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {CentralRepresentative.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subSection === item ? 'background.500' : 'gray.0'}
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

              bg={subSection === item ? 'background.500' : 'gray.0'}
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
        onClick={() => setIsOpenEconomicDetails(!isOpenEconomicDetails)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="SemiBold">
          {t['kymCoopUnionAcc6EconomicDetails']}
        </Text>
        {!isOpenEconomicDetails ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenEconomicDetails}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {EconomicDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              bg={subSection === item ? 'background.500' : 'gray.0'}
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
              bg={subSection === item ? 'background.500' : 'gray.0'}
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
