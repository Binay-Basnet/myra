import React from 'react';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Box, Collapse, Icon, Text } from '@chakra-ui/react';
import { KymIndAddSectionStatus } from '@coop/myra/graphql';

const PersonalInformation: string[] = [
  'Basic Information',
  'Contact Details',
  'Identification Details',
  'Permanent Address',
  'Temporary Address',
  'Incase of residing in Rented House',
  'Family Details',
];

const personalInfoEnum = {
  'Basic Information': 'BASIC_INFORMATION',
  'Contact Details': 'CONTACT_DETAILS',
  'Identification Details': 'IDENTIFICATION_DETAILS',
  'Permanent Address': 'PERMANENT_ADDRESS',
  'Temporary Address': 'TEMPORARY_ADDRESS',
  'Incase of residing in Rented House': 'REANTED_HOUSE',
  'Family Details': 'FAMILY_DETAILS',
};

const ProfessionalDetails: string[] = [
  'Profession',
  'Main Profession',
  'Main Occupation of Husaband/Wife',
  'Income Source Details',
];
const coopmembership: string[] = [
  'Main Purpose of Becoming a Member',
  'Member of Another cooperative',
  'Family Member in this institution',
  'Financial Transaction Details',
  'Estimated Withdraw/Deposit Amount in the Institureion',
];
const Decleration: string[] = [
  'Next to Kin',
  'Family members in politics',
  'Beneficial Owner',
  'Convicted/Non-convicted Status',
  'Residential permit of foreign country?',
];
// const Text = chakra(Tab, {
//   baseStyle: {
//     color: '#474F5C',
//     height: '40px',
//     fontSize: '14px',
//     fontWeight: '400',
//     textAlign: 'left',
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     border: 'none',
//     _selected: { color: '#37474F', bg: '#E2E8EE', fontWeight: '500' },
//   },
// });

interface AccordianProps {
  formStatus: KymIndAddSectionStatus;
  kymCurrentSection: {
    section: string;
    subSection: string;
  };
}

export function AccorrdianAddMember(props: AccordianProps) {
  const { formStatus, kymCurrentSection } = props;
  const subsection = kymCurrentSection?.subSection;
  const [isOpenPersonal, setIsOpenPersonal] = React.useState(false);
  const [isOpenProfessional, setIsOpenProfessional] = React.useState(false);
  const [isOpenCoopMemberShip, setIsOpenCoopMembership] = React.useState(false);
  const [isOpenDeclaration, setIsOpenDeclaration] = React.useState(false);

  React.useEffect(() => {
    const section = kymCurrentSection?.section;
    setIsOpenPersonal(section === 'personalDetails');
    setIsOpenProfessional(section === 'professionalDetails');
    setIsOpenCoopMembership(section === 'COOPmembership');
    setIsOpenDeclaration(section === 'declaration');
  }, [kymCurrentSection]);

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize={'r1'} fontWeight="600">
          1. Personal Details
        </Text>
        {!isOpenPersonal ? (
          <AiOutlineCaretRight
            fontSize="12px"
            onClick={() => setIsOpenPersonal(true)}
            cursor="pointer"
          />
        ) : (
          <AiOutlineCaretDown
            fontSize="12px"
            onClick={() => setIsOpenPersonal(false)}
            cursor="pointer"
          />
        )}
      </Box>
      <br />
      <Collapse in={isOpenPersonal}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {PersonalInformation.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <Text pl="s16" fontSize="r1" fontWeight="400">
                {item}
              </Text>
              &nbsp; &nbsp;
              {formStatus?.personal?.completed.includes(
                personalInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )}
              {formStatus?.personal?.error.includes(personalInfoEnum[item]) && (
                <Icon size="xs" as={AiFillCloseCircle} color="danger.500" />
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize={'r1'} fontWeight="600">
          2. Professional Details
        </Text>
        {!isOpenProfessional ? (
          <AiOutlineCaretRight
            fontSize="12px"
            onClick={() => setIsOpenProfessional(true)}
            cursor="pointer"
          />
        ) : (
          <AiOutlineCaretDown
            fontSize="12px"
            onClick={() => setIsOpenProfessional(false)}
            cursor="pointer"
          />
        )}
      </Box>
      <br />
      <Collapse in={isOpenProfessional}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {ProfessionalDetails.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <Text mb="s16" pl="s16" fontSize="r1" fontWeight="400">
                {item}
              </Text>
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize={'r1'} fontWeight="600">
          3. COOP Membership
        </Text>
        {!isOpenCoopMemberShip ? (
          <AiOutlineCaretRight
            fontSize="12px"
            onClick={() => setIsOpenCoopMembership(true)}
            cursor="pointer"
          />
        ) : (
          <AiOutlineCaretDown
            fontSize="12px"
            onClick={() => setIsOpenCoopMembership(false)}
            cursor="pointer"
          />
        )}
      </Box>
      <br />
      <Collapse in={isOpenCoopMemberShip}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {coopmembership.map((item, index) => (
            <Box
              key={`${item}${index}`}
              display="flex"
              alignItems={'center'}
              px={subsection === item ? 's16' : '0'}
              bg={subsection === item ? '#EEF2F7' : 'FFFFFF'}
              py="s8"
            >
              <Text mb="s16" pl="s16" fontSize="r1" fontWeight="400">
                {item}
              </Text>
            </Box>
          ))}
        </Box>
      </Collapse>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize={'r1'} fontWeight="600">
          4. Declaration
        </Text>
        {!isOpenDeclaration ? (
          <AiOutlineCaretRight
            fontSize="12px"
            onClick={() => setIsOpenDeclaration(true)}
            cursor="pointer"
          />
        ) : (
          <AiOutlineCaretDown
            fontSize="12px"
            onClick={() => setIsOpenDeclaration(false)}
            cursor="pointer"
          />
        )}
      </Box>
      <br />
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
              <Text mb="s16" pl="s16" fontSize="r1" fontWeight="400">
                {item}
              </Text>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
