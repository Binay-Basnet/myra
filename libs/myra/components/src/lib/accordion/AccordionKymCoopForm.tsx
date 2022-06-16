import React, { useState, useEffect } from 'react';
import {
  AiFillCloseCircle,
  AiOutlineCaretDown,
  AiOutlineCaretRight,
} from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Box, Collapse, Icon, Text } from '@chakra-ui/react';
import {
  KymCooperativeAddSectionStatus,
  KymCooperativeInstitutionInformationSection,
} from '@coop/shared/data-access';

const OrganizationInformation = [
  'Basic Information',
  'Registered Address',
  'Operating Address',
  'Contact Details',
  'Current Members',
  'Cooperative Date',
  'Representative',
  'Additional Coorperative Details',
  'Number of Employee',
];

const organizationInfoEnum: Record<
  typeof OrganizationInformation[number],
  KymCooperativeInstitutionInformationSection
> = {
  'Basic Information':
    KymCooperativeInstitutionInformationSection.BasicInformation,
  'Registered Address':
    KymCooperativeInstitutionInformationSection.RegisteredAddress,
  'Operating Address':
    KymCooperativeInstitutionInformationSection.OperatingAddress,
  'Contact Details': KymCooperativeInstitutionInformationSection.ContactDetails,
  'Current Members': KymCooperativeInstitutionInformationSection.CurrentMembers,
  Representative: KymCooperativeInstitutionInformationSection.Representative,
  'Additional Coorperative Details':
    KymCooperativeInstitutionInformationSection.AdditionalCooperativeDetails,
  'Number of Employee':
    KymCooperativeInstitutionInformationSection.NumberOfEmployee,
};

const EconomicDetails: string[] = ['Equity and Liabilities', 'Assets'];

const BoardOfDirectorsDetail: string[] = ['Board Of Director Details'];

const AccountOperatorDetail: string[] = ['Account Operator Detail'];

const Declaration: string[] = [
  'Account Holder Declaration',
  'Document Declaration',
];

interface AccordianProps {
  formStatus?: KymCooperativeAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export function AccordionKymCoopForm(props: AccordianProps) {
  const { formStatus, kymCurrentSection } = props;
  const subsection = kymCurrentSection?.subSection;
  const [isOpenOrganization, setIsOpenOrganization] = useState(false);
  const [isOpenEconomic, setIsOpenEconomic] = useState(false);
  const [isOpenBoardOfDirectors, setIsOpenBoardOfDirectors] = useState(false);
  const [isOpenAccountOperator, setIsOpenAccountOperator] = useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = useState(false);

  useEffect(() => {
    const section = kymCurrentSection?.section;
    setIsOpenOrganization(section === 'organaizationDetails');
    setIsOpenEconomic(section === 'economicDetails');
    setIsOpenBoardOfDirectors(section === 'boardOfDirectorsDetails');
    setIsOpenAccountOperator(section === 'accountOperatorDetails');
    setIsOpenDeclaration(section === 'declaration');
  }, [kymCurrentSection]);

  return (
    <Box p={'1'} overflow="auto" h="700px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganization(!isOpenOrganization)}
        _hover={{ bg: '#EEF2F7' }}
      >
        <Text fontSize={'r1'} fontWeight="600">
          1. Organization Details
        </Text>
        {!isOpenOrganization ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenOrganization} style={{ marginTop: '0px' }}>
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
              {formStatus?.personal?.completed?.includes(
                organizationInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )}
              {formStatus?.personal?.error?.includes(
                organizationInfoEnum[item]
              ) && <Icon size="xs" as={AiFillCloseCircle} color="danger.500" />}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenEconomic(!isOpenEconomic)}
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          2. Economic Details
        </Text>
        {!isOpenEconomic ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenEconomic}>
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
        onClick={() => setIsOpenBoardOfDirectors(!isOpenBoardOfDirectors)}
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          3. Details of Board Directors
        </Text>
        {!isOpenBoardOfDirectors ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenBoardOfDirectors}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {BoardOfDirectorsDetail.map((item, index) => (
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
        onClick={() => setIsOpenAccountOperator(!isOpenAccountOperator)}
        cursor="pointer"
        _hover={{ bg: '#EEF2F7' }}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          4. Details of Account Operators
        </Text>
        {!isOpenAccountOperator ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenAccountOperator}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {AccountOperatorDetail.map((item, index) => (
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
