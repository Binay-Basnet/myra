import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';

import { KymInsAddSectionStatus } from '@coop/cbs/data-access';
import { Box, Collapse, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const OrganizationInformation = [
  'kymInsBasicInformation',
  'kymInsRegisteredDetails',
  'kymInsOperatorOfficeAddress',
  'serviceCenterOfficeAddress',
  'kymInsContactDetails',
  'kymInsBankAccountDetails',
  'kymInsDetailsofsisterconcern',
];

// const personalInfoEnum: Record<
//   typeof PersonalInformation[number],
//   KymIndPersonalSection
// > = {
//   'Basic Information': KymIndPersonalSection.BasicInformation,
//   'Contact Details': KymIndPersonalSection.ContactDetails,
//   'Identification Details': KymIndPersonalSection.IdentificationDetails,
//   'Permanent Address': KymIndPersonalSection.PermanentAddress,
//   'Temporary Address': KymIndPersonalSection.TemporaryAddress,
//   'Incase of residing in Rented House': KymIndPersonalSection.RentedHouse,
//   'Family Details': KymIndPersonalSection.FamilyDetails,
// };

const TransactionProfile: string[] = [
  'kymInsTransactionProfile',
  'kymInsExpectedMonthlyTurnover',
  'kymInsExpectedMonthlyTransaction',
];
const Details: string[] = [
  'kymInsDetailsofProprietorPartnersDirectors',
  'kymInsDetailsofdirectorsaffiliatedwithotherFirms',
];
const Decleration: string[] = [
  'kymInsDocumentsDeclaration',
  'kymInsAccountHolderDeclaration',
];
const AccountOperations: string[] = [
  'kymInsDetailsofAccountOperators',
  'kymInsAccountOperationInstruction',
];

interface AccordianProps {
  formStatus?: KymInsAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export function AccorrdianAddInstitution(props: AccordianProps) {
  const { t } = useTranslation();
  const { kymCurrentSection } = props;
  const subsection = kymCurrentSection?.subSection;
  const [isOpenOrganizational, setIsOpenOrganizational] = React.useState(false);
  const [isOpenTransaction, setIsOpenTransaction] = React.useState(false);
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);
  const [isOpenAccountOperations, setIsOpenAccountOperations] =
    React.useState(false);

  React.useEffect(() => {
    const section = kymCurrentSection?.section;

    setIsOpenOrganizational(section === 'organizationInfo');
    setIsOpenTransaction(section === 'transactionProfile');
    setIsOpenDetails(section === 'details');
    setIsOpenDeclaration(section === 'declaration');
    setIsOpenAccountOperations(section === 'accountOperations');
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
          {t['kymIns1InformationofInstitution']}
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
        onClick={() => setIsOpenTransaction(!isOpenTransaction)}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymIns2TransactionProfile']}
        </Text>
        {!isOpenTransaction ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenTransaction}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {TransactionProfile.map((item, index) => (
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
        onClick={() => setIsOpenDetails(!isOpenDetails)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymIns3DetailsofProprietorpartnersDirectors']}
        </Text>
        {!isOpenDetails ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenDetails}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {Details.map((item, index) => (
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
        onClick={() => setIsOpenAccountOperations(!isOpenAccountOperations)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymIns4AccountOperations']}
        </Text>
        {!isOpenAccountOperations ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenAccountOperations}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {AccountOperations.map((item, index) => (
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
          {t['kymIns5Declaration']}
        </Text>
        {!isOpenDeclaration ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {Decleration.map((item, index) => (
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
