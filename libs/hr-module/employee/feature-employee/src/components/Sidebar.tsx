import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Text } from '@chakra-ui/react';

const PersonalInformation = [
  'Personal Information',
  'Contact Details',
  'Permanent Address',
  'Temporary Address',
  'Family Details',
  'Educational Information',
  'Identification Details',
];

const ProfessionalDetails: string[] = ['Work Information', 'Work Experience', 'Other Details'];
const Setups: string[] = ['Payroll Setup', 'Other Schemes', 'Configurations'];
const Decleration: string[] = ['Documents Declarations'];

interface AccordianProps {
  // formStatus?: any | null;
  currentSection?: {
    section: string;
    subSection: string;
  };
}

export const SidebarEmployeeAddForm = (props: AccordianProps) => {
  // const { formStatus, currentSection } = props;
  const { currentSection } = props;
  const subsection = currentSection?.subSection;
  const [isOpenPersonal, setIsOpenPersonal] = React.useState(false);
  const [isOpenProfessional, setIsOpenProfessional] = React.useState(false);
  const [isOpenConfigurations, setIsOpenConfigurations] = React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);

  React.useEffect(() => {
    const section = currentSection?.section;
    setIsOpenPersonal(section === 'personalDetails');
    setIsOpenProfessional(section === 'professionalDetails');
    setIsOpenConfigurations(section === 'Configurations');
    setIsOpenDeclaration(section === 'declaration');
  }, [currentSection]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        minH="3.125rem"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenPersonal(!isOpenPersonal)}
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          1. Basic Information
        </Text>
        {!isOpenPersonal ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenPersonal} style={{ marginTop: '0px' }}>
        <Box display="flex" flexDirection="column">
          {PersonalInformation.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
              borderRadius="br2"
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
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
        cursor="pointer"
        onClick={() => setIsOpenProfessional(!isOpenProfessional)}
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          2. Professional Information
        </Text>
        {!isOpenProfessional ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenProfessional}>
        <Box display="flex" flexDirection="column" mb="s16">
          {ProfessionalDetails.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
              borderRadius="br2"
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
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
        onClick={() => setIsOpenConfigurations(!isOpenConfigurations)}
        cursor="pointer"
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          3. Setups
        </Text>
        {!isOpenConfigurations ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenConfigurations}>
        <Box display="flex" flexDirection="column" mb="s16">
          {Setups.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
              borderRadius="br2"
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
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
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          4. Declaration
        </Text>
        {!isOpenDeclaration ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display="flex" flexDirection="column" mb="s16">
          {Decleration.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
              borderRadius="br2"
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {item}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
};
