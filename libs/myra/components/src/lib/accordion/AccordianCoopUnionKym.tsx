import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { Box, Collapse, Text } from '@chakra-ui/react';

import { KymInsAddSectionStatus } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

const OrganizationInformation = [
  'kymCoopUnionAccBasicInformation',
  'kymCoopUnionAccRegisteredDetails',
  'kymCoopUnionAccOperatingOfficeAddress',
  'kymCoopUnionAccBranchOfficeAddress',
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

export function AccorrdianAddCOOPUnion(props: AccordianProps) {
  const { t } = useTranslation();
  const { kymCurrentSection } = props;
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
    <Box p={'1'} overflow="auto" h="700px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganizational(!isOpenOrganizational)}
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc1InstitutionInformation']}
        </Text>
        {!isOpenOrganizational ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenOrganizational} style={{ marginTop: '0px' }}>
        <Box display={'flex'} flexDirection="column">
          {OrganizationInformation.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
                  {t[item]}
                </Text>
              </a>
              &nbsp; &nbsp;
              {/* {formStatus?.personal?.completed?.includes(
                personalInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )}
              {formStatus?.personal?.error?.includes(
                personalInfoEnum[item]
              ) && <Icon size="xs" as={AiFillCloseCircle} color="danger.500" />} */}
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc2Detailsofdirectorsboardmemberspartners']}
        </Text>
        {!isopenDirector ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isopenDirector}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {DirectorDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
        onClick={() => setIsopenAccountOperators(!isopenAccountOperators)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc3AccountOperators']}
        </Text>
        {!isopenAccountOperators ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isopenAccountOperators}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {AccountOperators.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
        onClick={() =>
          setIsopenCentralRepresentatives(!isopenCentralRepresentatives)
        }
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc4DetailsofCentralRepresentative']}
        </Text>
        {!isopenCentralRepresentatives ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isopenCentralRepresentatives}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {CentralRepresentative.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
        <Text fontSize={'r1'} fontWeight="600">
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
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc6EconomicDetails']}
        </Text>
        {!isOpenEconmoicDetails ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenEconmoicDetails}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {EconomicDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopUnionAcc7Declaration']}
        </Text>
        {!isOpenDeclaration ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {Declaration.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="400">
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
