import React from 'react';
import {
  AiFillCloseCircle,
  AiOutlineCaretDown,
  AiOutlineCaretRight,
} from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Box, Collapse, Icon, Text } from '@chakra-ui/react';
import { KymInsAddSectionStatus } from '@coop/shared/data-access';

const OrganizationInformation = [
  'Basic Information',
  'Registered Details',
  'Contact Details',
  'Bank Account Details',
];
const DirectorDetails = ['Details of Proprietor, Partners, Directors.'];
const AccountOperators = ['Details of Account Operators'];
const CentralRepresentative = [
  'Details of directors affiliated with other Firms',
];
const memberDetails = ['Current Members', 'Target for next fiscal year'];
const EconomicDetails = [
  'Assets',
  'Equity and Liailibities',
  'Income Details',
  'Expense Details',
];
const Declaration = ['Documents Declaration', 'Account Holder Declaration'];

interface AccordianProps {
  formStatus?: KymInsAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export function AccorrdianAddCOOPUnion(props: AccordianProps) {
  const { formStatus, kymCurrentSection } = props;
  const subsection = kymCurrentSection?.subSection;
  const [isOpenOrganizational, setIsOpenOrganizational] = React.useState(false);
  const [isopenDirector, setIsopenDirector] = React.useState(false);
  const [isOpenmemberDetails, setIsOpenMemberDetails] = React.useState(false);
  const [isOpenEconmoicDetails, setIsOpenEconomicDetails] =
    React.useState(false);
  const [isopenAccountOperators, setIsopenAccountOperators] =
    React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);
  const [isopenCentralRepresentatives, setIsopenCentralRepresentatives] =
    React.useState(false);
  console.log('curent section', kymCurrentSection);
  React.useEffect(() => {
    const section = kymCurrentSection?.section;

    setIsOpenOrganizational(section === 'organizationInfo');
    setIsopenDirector(section === 'directorDetails');
    setIsopenAccountOperators(section === 'accountOperators');
    setIsOpenDeclaration(section === 'declaration');
    setIsopenCentralRepresentatives(section === 'centralRepresentatives');
    setIsOpenMemberDetails(section === 'memberDetails');
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
        _hover={{ bg: '#EEF2F7' }}
      >
        <Text fontSize={'r1'} fontWeight="600">
          1. Institution Information
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
        onClick={() => setIsopenDirector(!isopenDirector)}
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          2. Details of directors/boardmembers/partners
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
        onClick={() => setIsopenAccountOperators(!isopenAccountOperators)}
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          3. Account Operators
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
        onClick={() =>
          setIsopenCentralRepresentatives(!isopenCentralRepresentatives)
        }
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          4. Details of Central Representative
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
        onClick={() => setIsOpenMemberDetails(!isOpenmemberDetails)}
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          5. Details of member
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
        onClick={() => setIsOpenEconomicDetails(!isOpenEconmoicDetails)}
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          6. Economic Details
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
          7. Declaration
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
