import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import {
  FormAddress,
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface ICOOPDirector {
  index: number;
  removeDirector: (index: number) => void;
}

export const AddDirector = ({ removeDirector, index }: ICOOPDirector) => {
  const { t } = useTranslation();
  const { watch } = useFormContext<KymCooperativeFormInput>();

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `directorDetails.${index}.isPermanentAndTemporaryAddressSame`
  );

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
          <Text fontSize="r1">{t['kymCoopDirector']}</Text>
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
              removeDirector(index);
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
        <Box display="flex" flexDirection="column">
          <FormSection>
            <FormInput
              isRequired
              id="boardDirectorCoop"
              type="text"
              name={`directorDetails.${index}.nameEn`}
              label={t['kymCoopFullName']}
            />
            <FormInput
              id="boardDirectorCoop"
              type="text"
              name={`directorDetails.${index}.designation`}
              label={t['kymCoopDesignation']}
            />
          </FormSection>

          <FormAddress
            sectionId="boardDirectorCoop"
            sectionHeader="kymCoopPermanentAddress"
            name={`directorDetails.${index}.permanentAddress`}
          />

          <FormSection header="kymCoopTemporaryAddress">
            <GridItem colSpan={3}>
              <FormSwitch
                id="boardOfDirectorsDetails"
                name={`directorDetails.${index}.isPermanentAndTemporaryAddressSame`}
                label={t['kymCoopTemporaryAddressPermanent']}
              />
            </GridItem>

            {!isPermanentAndTemporaryAddressSame && (
              <FormAddress name={`directorDetails.${index}.temporaryAddress`} />
            )}
          </FormSection>

          <FormSection>
            <FormDatePicker
              id="boardDirectorCoop"
              type="date"
              name={`directorDetails.${index}.dateOfMembership`}
              label={t['kymCoopDateOfMembership']}
            />
            <FormInput
              id="boardDirectorCoop"
              type="text"
              name={`directorDetails.${index}.highestQualification`}
              label={t['kymCoopHighestQualification']}
            />
            <FormInput
              isRequired
              id="boardDirectorCoop"
              type="number"
              name={`directorDetails.${index}.contactNumber`}
              label={t['kymCoopMobileNo']}
            />
            <FormInput
              id="boardDirectorCoop"
              type="text"
              name={`directorDetails.${index}.email`}
              label={t['kymCoopEmail']}
            />
            <FormInput
              id="boardDirectorCoop"
              type="string"
              name={`directorDetails.${index}.citizenshipNo`}
              label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
            />
            <FormInput
              id="boardDirectorCoop"
              type="string"
              name={`directorDetails.${index}.panNo`}
              label={t['kymCoopPanOrVatNo']}
            />
          </FormSection>
        </Box>
        <FormSection templateColumns={2}>
          <FormFileInput
            size="lg"
            name={`directorDetails.${index}.documents.0.identifiers`}
            label={t['kymCoopPhotograph']}
          />
          <FormFileInput
            size="lg"
            name={`directorDetails.${index}.documents.1.identifiers`}
            label={t['kymCoopPhotographOfIdentityProofDocument']}
          />
          <Box w="124px">
            <FormFileInput
              size="md"
              name={`directorDetails.${index}.documents.2.identifiers`}
              label={t['kymCoopSignature']}
            />
          </Box>
        </FormSection>

        <Box display="flex" justifyContent="flex-end" py="s10" px="s20">
          <Button
            id="kymCOOPdirectorRemoveButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(index);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
