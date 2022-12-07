import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';

import { KymCoopDirectorDetailsFormInput } from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormDatePicker, FormInput, FormSwitch } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { Bottomdirectorcoop } from './boardDirectorDocuments';
import { useCooperativeBOD } from '../hooks/useCooperativeBOD';

interface ICOOPDirector {
  removeDirector: (sisterId: string) => void;
  setSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const AddDirector = ({ directorId, removeDirector, setSection }: ICOOPDirector) => {
  const { t } = useTranslation();
  const methods = useForm<KymCoopDirectorDetailsFormInput>();

  const { watch } = methods;

  useCooperativeBOD({ methods, directorId });

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(`isPermanentAndTemporaryAddressSame`);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={2}
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
          h="60px"
        >
          <Text fontSize="r1">{`Director `}</Text>
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
            id="boardDirectorCloseIcon"
            variant="ghost"
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector(directorId);
            }}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse
        in={isOpen}
        style={{
          marginTop: '0px',
          border: '1px solid',
          borderColor: '#E0E5EB',
        }}
      >
        <DynamicBoxGroupContainer>
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setSection(kymSection);
              }}
            >
              <Box display="flex" flexDirection="column">
                <FormSection>
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="nameEn"
                    label={t['kymCoopFullName']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="designation"
                    label={t['kymCoopDesignation']}
                  />
                </FormSection>

                <FormAddress
                  sectionId="boardDirectorCoop"
                  sectionHeader="kymCoopPermanentAddress"
                  name="permanentAddress"
                />

                <FormSection header="kymCoopTemporaryAddress">
                  <GridItem colSpan={3}>
                    <FormSwitch
                      id="boardOfDirectorsDetails"
                      name="isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopTemporaryAddressPermanent']}
                    />
                  </GridItem>

                  {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
                </FormSection>

                <FormSection>
                  <FormDatePicker
                    id="boardDirectorCoop"
                    type="date"
                    name="dateOfMembership"
                    label={t['kymCoopDateOfMembership']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="highestQualification"
                    label={t['kymCoopHighestQualification']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="number"
                    name="contactNumber"
                    label={t['kymCoopMobileNo']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="email"
                    label={t['kymCoopEmail']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="string"
                    name="citizenshipNo"
                    label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="string"
                    name="panNo"
                    label={t['kymCoopPanOrVatNo']}
                  />
                </FormSection>
              </Box>
            </form>
          </FormProvider>

          <Bottomdirectorcoop directorId={directorId} setKymCurrentSection={setSection} />

          {/* <Grid
                  templateColumns="repeat(2, 1fr)"
                  rowGap="s32"
                  columnGap="s20"
                >
                  <FormFileInput
                    size="lg"
                    label={t['kymCoopPhotograph']}
                    // control={control}
                    name={`photograph`}
                  />
                  <FormFileInput
                    size="lg"
                    label={t['kymCoopPhotographOfIdentityProofDocument']}
                    // control={control}
                    name={`identityDocumentPhoto`}
                  />

                  <Box w="124px">
                    <FormFileInput
                      size="md"
                      label={t['kymCoopSignature']}
                      // control={control}
                      name={`signature`}
                    />
                  </Box>
                </Grid> */}
        </DynamicBoxGroupContainer>
        <Box display="flex" justifyContent="flex-end" py="s10" px="s20">
          <Button
            id="kymCOOPdirectorRemoveButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(directorId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
