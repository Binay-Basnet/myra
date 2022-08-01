import React, { useEffect, useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';

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

const EconomicDetails: string[] = [
  'kymCoopAccEquityandLiabilities',
  'kymCoopAccAssets',
];

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

export function AccordionKymCoopForm(props: AccordianProps) {
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
    <Box p={'1'} overflow="auto" h="700px" mt="60px">
      <Box
        display="flex"
        justifyContent="space-between"
        minH="50px"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsOpenOrganization(!isOpenOrganization)}
      >
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopAcc1OrganizationDetails']}
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopAcc2EconomicDetails']}
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopAcc3DetailsofBoardDirectors']}
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
        <Text fontSize={'r1'} fontWeight="600">
          {t['kymCoopAcc4DetailsofAccountOperators']}
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
          {t['kymCoopAcc5Declaration']}
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
