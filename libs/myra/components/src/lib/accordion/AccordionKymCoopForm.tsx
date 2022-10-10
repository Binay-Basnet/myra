import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { Box, Collapse, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const OrganizationInformation = [
  'kymCoopAccBasicInformation',
  'kymCoopAccRegisteredAddress',
  'kymCoopAccOperatingAddress',
  'kymCoopAccContactDetails',
  'kymCoopAccCurrentMembers',
  'kymCoopAccCooperativeDate',
  'kymCoopAccRepresentative',
  'kymCoopAccAdditionalCoorperativeDetails',
  'kymCoopAccNumberofEmployee',
];

// const organizationInfoEnum: Record<
//   typeof OrganizationInformation[number],
//   KymCooperativeInstitutionInformationSection
// > = {
//   kymCoopAccBasicInformation:
//     KymCooperativeInstitutionInformationSection.BasicInformation,
//   kymCoopAccRegisteredAddress:
//     KymCooperativeInstitutionInformationSection.RegisteredAddress,
//   kymCoopAccOperatingAddress:
//     KymCooperativeInstitutionInformationSection.OperatingAddress,
//   kymCoopAccContactDetails:
//     KymCooperativeInstitutionInformationSection.ContactDetails,
//   kymCoopAccCurrentMembers:
//     KymCooperativeInstitutionInformationSection.CurrentMembers,
//   kymCoopAccRepresentative:
//     KymCooperativeInstitutionInformationSection.Representative,
//   kymCoopAccAdditionalCoorperativeDetails:
//     KymCooperativeInstitutionInformationSection.AdditionalCooperativeDetails,
//   kymCoopAccNumberofEmployee:
//     KymCooperativeInstitutionInformationSection.NumberOfEmployee,
// };

const EconomicDetails: string[] = ['kymCoopAccEquityandLiabilities', 'kymCoopAccAssets'];

const BoardOfDirectorsDetail: string[] = ['kymCoopAccBoardOfDirectorDetails'];

const AccountOperatorDetail: string[] = ['kymCoopAccAccountOperatorDetail'];

const Declaration: string[] = [
  'kymCoopAccAccountHolderDeclaration',
  'kymCoopAccDocumentDeclaration',
];

interface AccordianProps {
  // formStatus?: KymCooperativeAddSectionStatus | null;
  kymCurrentSection?: {
    section: string;
    subSection: string;
  };
}

export const AccordionKymCoopForm = (props: AccordianProps) => {
  const { t } = useTranslation();
  const { kymCurrentSection } = props;
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
    <Box overflow="auto" h="700px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganization(!isOpenOrganization)}
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopAcc1OrganizationDetails']}
        </Text>
        {!isOpenOrganization ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenOrganization} style={{ marginTop: '0px' }}>
        <Box display="flex" flexDirection="column">
          {OrganizationInformation.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
              bg={subsection === item ? 'background.500' : 'gray.0'}
              py="s8"
            >
              <a href={`#${item}`}>
                <Text pl="s16" fontSize="r1" fontWeight="Regular">
                  {t[item]}
                </Text>
              </a>
              &nbsp; &nbsp;
              {/* {formStatus?.personal?.completed?.includes(
                organizationInfoEnum[item]
              ) && (
                <Icon size="xs" as={BsCheckCircleFill} color="primary.500" />
              )}
              {formStatus?.personal?.error?.includes(
                organizationInfoEnum[item]
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
        onClick={() => setIsOpenEconomic(!isOpenEconomic)}
        minH="50px"
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopAcc2EconomicDetails']}
        </Text>
        {!isOpenEconomic ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenEconomic}>
        <Box display="flex" flexDirection="column" mb="s16">
          {EconomicDetails.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
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
        onClick={() => setIsOpenBoardOfDirectors(!isOpenBoardOfDirectors)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopAcc3DetailsofBoardDirectors']}
        </Text>
        {!isOpenBoardOfDirectors ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenBoardOfDirectors}>
        <Box display="flex" flexDirection="column" mb="s16">
          {BoardOfDirectorsDetail.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
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
        onClick={() => setIsOpenAccountOperator(!isOpenAccountOperator)}
        cursor="pointer"
        minH="50px"
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopAcc4DetailsofAccountOperators']}
        </Text>
        {!isOpenAccountOperator ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenAccountOperator}>
        <Box display="flex" flexDirection="column" mb="s16">
          {AccountOperatorDetail.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
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
        minH="50px"
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopAcc5Declaration']}
        </Text>
        {!isOpenDeclaration ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </Box>

      <Collapse in={isOpenDeclaration}>
        <Box display="flex" flexDirection="column" mb="s16">
          {Declaration.map((item) => (
            <Box
              key={`${item}${Math.random()}`}
              display="flex"
              alignItems="center"
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
    </Box>
  );
};
