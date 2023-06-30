import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

import { KYMSection } from '../../constants/KYMSection';

const INDIVIDUAL_PERSONAL_INFORMATION = [
  KYMSection.INDIVIDUAL_BASIC_INFORMATION,
  KYMSection.INDIVIDUAL_CONTACT_DETAILS,
  KYMSection.INDIVIDUAL_IDENTIFICATION_DETAILS,
  KYMSection.INDIVIDUAL_PERMANENT_ADDRESS,
  KYMSection.INDIVIDUAL_TEMPORARY_ADDRESS,
  KYMSection.INDIVIDUAL_IN_CASE_OF_RESIDING_IN_RENTED_HOUSE,
  KYMSection.INDIVIDUAL_FAMILY_DETAILS,
  KYMSection.INDIVIDUAL_FAMILY_MEMBERS,
];

const ProfessionalDetails: string[] = [
  'kymAccIndProfession',
  'kymAccIndMainProfession',
  'kymAccIndMainOccupationofHusabandWife',
  'kymAccIndIncomeSourceDetails',
];
const coopmembership: string[] = [
  'kymAccIndMainPurposeofBecomingMember',
  'kymAccIndMemberofAnothercooperative',
  'kymAccIndFamilyMemberinthisinstitution',
  'kymAccIndFinancialTransactionDetails',
  'kymAccIndEstimatedWithdrawDepositAmountintheInstitureion',
];
const Decleration: string[] = [
  'kymAccIndBeneficialOwner',
  // 'kymAccIndNexttoKin',
  'kymAccIndFamilymembersinpolitics',
  'kymAccIndConvictedNonconvictedStatus',
  'kymAccIndResidentialpermitofforeigncountry',
];

interface AccordianProps {
  // formStatus?: any | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  } | null;
}

export const AccorrdianAddMember = (props: AccordianProps) => {
  const { t } = useTranslation();
  // const { formStatus, kymCurrentSection } = props;
  const { kymCurrentSection } = props;
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
          {t['kymAccInd1PersonalDetails']}
        </Text>
        {!isOpenPersonal ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenPersonal} style={{ marginTop: '0px' }}>
        <Box display="flex" flexDirection="column">
          {INDIVIDUAL_PERSONAL_INFORMATION.map((item) => (
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
                  {t[item]}
                </Text>
              </a>
              &nbsp; &nbsp;
              {/* {formStatus?.data?.personal?.completed?.includes(
                personalInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )} */}
              {/* {formStatus?.data?.personal?.error?.includes(
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
        onClick={() => setIsOpenProfessional(!isOpenProfessional)}
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          {t['kymAccInd2ProfessionalDetails']}
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
        onClick={() => setIsOpenCoopMembership(!isOpenCoopMemberShip)}
        cursor="pointer"
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          {t['kymAccInd3COOPMembership']}
        </Text>
        {!isOpenCoopMemberShip ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenCoopMemberShip}>
        <Box display="flex" flexDirection="column" mb="s16">
          {coopmembership.map((item) => (
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
        minH="3.125rem"
      >
        <Text fontSize="r1" fontWeight="Semibold">
          {t['kymAccInd4Declaration']}
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
                  {t[item]}
                </Text>
              </a>
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
};
