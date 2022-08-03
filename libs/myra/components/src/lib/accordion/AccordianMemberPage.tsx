import React from 'react';
import {
  AiFillCloseCircle,
  AiOutlineCaretDown,
  AiOutlineCaretRight,
} from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Box, Collapse, Icon, Text } from '@chakra-ui/react';

import {
  KymIndAddSectionStatus,
  KymIndPersonalSection,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

const PersonalInformation = [
  'kymAccIndBasicInformation',
  'kymAccIndContactDetails',
  'kymAccIndIdentificationDetails',
  'kymAccIndPermanentAddress',
  'kymAccIndTemporaryAddress',
  'kymAccIndIncaseofresidinginRentedHouse',
  'kymAccIndFamilyDetails',
];

const personalInfoEnum: Record<
  typeof PersonalInformation[number],
  KymIndPersonalSection
> = {
  kymAccIndBasicInformation: KymIndPersonalSection.BasicInformation,
  kymAccIndContactDetails: KymIndPersonalSection.ContactDetails,
  kymAccIndIdentificationDetails: KymIndPersonalSection.IdentificationDetails,
  kymAccIndPermanentAddress: KymIndPersonalSection.PermanentAddress,
  kymAccIndTemporaryAddress: KymIndPersonalSection.TemporaryAddress,
  kymAccIndIncaseofresidinginRentedHouse: KymIndPersonalSection.RentedHouse,
  kymAccIndFamilyDetails: KymIndPersonalSection.FamilyDetails,
};

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
  formStatus?: KymIndAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export function AccorrdianAddMember(props: AccordianProps) {
  const { t } = useTranslation();
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
    <Box p={'1'} overflow="auto" h="700px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenPersonal(!isOpenPersonal)}
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymAccInd1PersonalDetails']}
        </Text>
        {!isOpenPersonal ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenPersonal} style={{ marginTop: '0px' }}>
        <Box display={'flex'} flexDirection="column">
          {PersonalInformation.map((item, index) => (
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
              {formStatus?.personal?.completed?.includes(
                personalInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )}
              {formStatus?.personal?.error?.includes(
                personalInfoEnum[item]
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
        onClick={() => setIsOpenProfessional(!isOpenProfessional)}
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymAccInd2ProfessionalDetails']}
        </Text>
        {!isOpenProfessional ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

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
        onClick={() => setIsOpenCoopMembership(!isOpenCoopMemberShip)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymAccInd3COOPMembership']}
        </Text>
        {!isOpenCoopMemberShip ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

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
          {t['kymAccInd4Declaration']}
        </Text>
        {!isOpenDeclaration ? (
          <AiOutlineCaretRight fontSize="12px" />
        ) : (
          <AiOutlineCaretDown fontSize="12px" />
        )}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display={'flex'} flexDirection="column" mb="s16">
          {Decleration.map((item, index) => {
            return (
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
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
