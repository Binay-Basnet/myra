import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Collapse,
  FormSection,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@myra-ui';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { InputGroupContainer, SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormAddress,
  FormDatePicker,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoardOfDirectorRelatedTraining } from './TrainingRelatedToCooperatives';

interface IAddDirectorProps {
  removeDirector: () => void;
  index: number;
}

const AddDirector = ({ removeDirector, index }: IAddDirectorProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(true);
  // const methods = useForm<CoopUnionPersonnelInput>();
  const { watch, control } = useFormContext();

  // useCoopUnionBod({ methods, directorId });

  const isPermanentAndTemporaryAddressSame = watch(
    `directors.${index}.isPermanentAndTemporaryAddressSame`
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px="s12"
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
          h="60px"
        >
          <Text fontSize="r1">{`Director ${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => removeDirector()}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse
        in={isOpen}
        style={{ marginTop: '0px', border: '1px solid', borderColor: '#E0E5EB' }}
      >
        {/* <DynamicBoxGroupContainer> */}
        <SectionContainer>
          <Box display="flex" flexDirection="column" gap="s32">
            <Box display="flex" flexDirection="column" gap="s16">
              <FormSection>
                <FormInput
                  isRequired
                  type="text"
                  name={`directors.${index}.fullName`}
                  id="boardOfDirectors.fullName"
                  label={t['kymCoopUnionFullName']}
                />
                <FormInput
                  isRequired
                  type="text"
                  name={`directors.${index}.designationEn`}
                  id="boardOfDirectors.designationEn"
                  label={t['kymCoopUnionDesignation']}
                />
              </FormSection>
              <FormSection header="kymCoopUnionPermanentAddress">
                <FormAddress name={`directors.${index}.permanentAddress`} />
              </FormSection>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap="s16"
              borderBottom="1px solid"
              borderBottomColor="border.layout"
            >
              <FormSection header="kymCoopUnionTemporaryAddress" id="Temporary Address">
                <GridItem colSpan={3}>
                  <FormSwitch
                    control={control}
                    id="boardOfDirectors.isPermanentAndTemporaryAddressSame"
                    name={`directors.${index}.isPermanentAndTemporaryAddressSame`}
                    label={t['kymCoopUnionTemporaryAddressPermanent']}
                  />
                </GridItem>
                {!isPermanentAndTemporaryAddressSame && (
                  <FormAddress name={`directors.${index}.temporaryAddress`} />
                )}
              </FormSection>

              <InputGroupContainer p="s16">
                <FormDatePicker
                  name={`directors.${index}.dateOfMembership`}
                  id="boardOfDirectors.dateOfMembership"
                  label={t['kymCoopUnionDateOfMembership']}
                />
                <FormInput
                  type="text"
                  name={`directors.${index}.highestQualification`}
                  id="boardOfDirectors.highestQualification"
                  label={t['kymCoopUnionHighestQualification']}
                />
                <FormInput
                  isRequired
                  type="number"
                  name={`directors.${index}.mobileNumber`}
                  id="boardOfDirectors.mobileNumber"
                  label={t['kymCoopUnionMobileNo']}
                />
                <FormEmailInput
                  isRequired
                  type="text"
                  name={`directors.${index}.email`}
                  id="boardOfDirectors.email"
                  label={t['kymCoopUnionEmail']}
                />
                <FormInput
                  isRequired
                  type="string"
                  name={`directors.${index}.citizenshipNo`}
                  id="boardOfDirectors.citizenshipNo"
                  label={t['kymCoopUnionCitizenshipPassportDrivingLicenseNo']}
                />
                <FormInput
                  isRequired
                  type="string"
                  name={`directors.${index}.panNo`}
                  id="boardOfDirectors.panNo"
                  label={t['kymCoopUnionPANNo']}
                />
              </InputGroupContainer>
            </Box>
            <BoardOfDirectorRelatedTraining directorIndex={index} />
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" p="s16" mt="s32" rowGap="s32" columnGap="s20">
            <FormFileInput
              size="lg"
              label={t['kymCoopUnionPhotograph']}
              name={`directors.${index}.documents.0.identifiers`}
            />
            <FormFileInput
              size="lg"
              label={t['kymCoopUnionPhotographOfIdentityProofDocument']}
              name={`directors.${index}.documents.1.identifiers`}
            />
          </Grid>
        </SectionContainer>
        {/* </DynamicBoxGroupContainer> */}

        <Box display="flex" justifyContent="flex-end" alignItems="center" h="60px" px="s20">
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => removeDirector()}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

export const BoardDirectorInfo = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<CoopUnionInstitutionInformationInput>();

  const { fields, append, remove } = useFieldArray({ name: 'directors', control });

  return (
    <FormSection
      id="kymCoopUnionAccDetailsofProprietor"
      header="kymCoopUnionBoardOfDirectorDetails"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {fields.map((field, index) => (
            <Box
              key={field.id}
              display="flex"
              flexDirection="column"
              id="Details of Proprietor, Partners, Directors."
              scrollMarginTop="200px"
            >
              <AddDirector index={index} removeDirector={() => remove(index)} />
            </Box>
          ))}
          <GridItem colSpan={1}>
            <Button
              id="boardOfDirectors.directordetailsButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() =>
                append({
                  documents: [
                    { fieldId: 'photograph', identifiers: [] },
                    { fieldId: 'identityDocumentPhoto', identifiers: [] },
                  ],
                })
              }
            >
              {t['kymCoopUnionAddDirector']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};
