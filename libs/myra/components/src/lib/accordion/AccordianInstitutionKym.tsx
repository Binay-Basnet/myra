import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { Box, Collapse, Text } from '@chakra-ui/react';

import { KymInsAddSectionStatus } from '@coop/shared/data-access';

const OrganizationInformation = [
  'Basic Information',
  'Registered Details',
  'Contact Details',
  'Bank Account Details',
  'Details of sister concern',
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
  'Transaction Profile',
  'Expected Monthly Turnover',
  'Expected Monthly Transaction',
];
const Details: string[] = [
  'Details of Proprietor, Partners, Directors.',
  'Details of directors affiliated with other Firms',
];
const Decleration: string[] = [
  'Documents Declaration',
  'Account Holder Declaration',
];
const AccountOperations: string[] = [
  'Details of Account Operators',
  'Account Operation Instruction',
];

interface AccordianProps {
  formStatus?: KymInsAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export function AccorrdianAddInstitution(props: AccordianProps) {
  const { formStatus, kymCurrentSection } = props;
  const subsection = kymCurrentSection?.subSection;
  const [isOpenOrganizational, setIsOpenOrganizational] = React.useState(false);
  const [isOpenTransaction, setIsOpenTransaction] = React.useState(false);
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);
  const [isOpenAccountOperations, setIsOpenAccountOperations] =
    React.useState(false);
  console.log('curent section', kymCurrentSection);
  React.useEffect(() => {
    const section = kymCurrentSection?.section;

    setIsOpenOrganizational(section === 'organizationInfo');
    setIsOpenTransaction(section === 'transactionProfile');
    setIsOpenDetails(section === 'details');
    setIsOpenDeclaration(section === 'declaration');
    setIsOpenAccountOperations(section === 'accountOperations');
  }, [kymCurrentSection]);

  return (
    <Box p={'1'} overflow="auto" h="700px" mt="60px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganizational(!isOpenOrganizational)}
        _hover={{ bg: '#EEF2F7' }}
      >
        <Text fontSize={'r1'} fontWeight="600">
          1. Information of Organization
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
                  {item}
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
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          2. Transaction Profile
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
                  {item}
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
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          3. Details of Proprietor, partners, Directors
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
                  {item}
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
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          4. Account Operations
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
                  {item}
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
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          5. Declaration
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
                  {item}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
