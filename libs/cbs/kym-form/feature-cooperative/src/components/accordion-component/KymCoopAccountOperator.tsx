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

import { DynamicAddtraining } from './acoountOperatorTraining';

interface IAddDirector {
  index: number;
  removeDirector: (index: number) => void;
}

export const AddOperator = ({ removeDirector, index }: IAddDirector) => {
  const { t } = useTranslation();
  const { watch } = useFormContext<KymCooperativeFormInput>();

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `accountOperator.${index}.isPermanentAndTemporaryAddressSame`
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px="s12"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          h="60px"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{t['kymCoopAccountOperator']}</Text>
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
            id="accountOperatorCloseIcon"
            size="sm"
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

      <Collapse
        in={isOpen}
        style={{ marginTop: '0px', border: '1px solid', borderColor: '#E0E5EB' }}
      >
        <Box display="flex" flexDirection="column" gap="s48">
          <FormSection>
            <FormInput
              isRequired
              id="accountOperatorCoop"
              type="text"
              name={`accountOperator.${index}.nameEn`}
              label={t['kymCoopFullName']}
            />
            <FormInput
              id="accountOperatorCoop"
              type="text"
              name={`accountOperator.${index}.designation`}
              label={t['kymCoopDesignation']}
            />
          </FormSection>

          <FormAddress
            sectionId="accountOperatorCoop"
            sectionHeader="kymCoopPermanentAddress"
            name={`accountOperator.${index}.permanentAddress`}
          />

          <FormSection header="kymCoopTemporaryAddress">
            <GridItem colSpan={3}>
              <FormSwitch
                name={`accountOperator.${index}.isPermanentAndTemporaryAddressSame`}
                label={t['kymCoopTemporaryAddressPermanent']}
              />
            </GridItem>

            {!isPermanentAndTemporaryAddressSame && (
              <FormAddress name={`accountOperator.${index}.temporaryAddress`} />
            )}
          </FormSection>

          <FormSection>
            <FormDatePicker
              id="accountOperatorCoop"
              name={`accountOperator.${index}.dateOfMembership`}
              label={t['kymCoopDateOfMembership']}
            />
            <FormInput
              type="text"
              id="accountOperatorCoop"
              name={`accountOperator.${index}.highestQualification`}
              label={t['kymCoopHighestQualification']}
            />
            <FormInput
              isRequired
              id="accountOperatorCoop"
              type="number"
              name={`accountOperator.${index}.contactNumber`}
              label={t['kymCoopMobileNo']}
            />
            <FormInput
              id="accountOperatorCoop"
              type="text"
              name={`accountOperator.${index}.email`}
              label={t['kymCoopEmail']}
            />
            <FormInput
              id="accountOperatorCoop"
              type="string"
              name={`accountOperator.${index}.citizenshipNo`}
              label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
            />
            <FormInput
              id="accountOperatorCoop"
              type="string"
              name={`accountOperator.${index}.panNo`}
              label={t['kymCoopPanOrVatNo']}
            />
          </FormSection>
          <DynamicAddtraining index={index} />
        </Box>

        <FormSection templateColumns={2}>
          <FormFileInput
            size="lg"
            name={`accountOperator.${index}.documents.0.identifiers`}
            label={t['kymCoopPhotograph']}
          />
          <FormFileInput
            size="lg"
            name={`accountOperator.${index}.documents.1.identifiers`}
            label={t['kymCoopPhotographOfIdentityProofDocument']}
          />
          <Box w="124px">
            <FormFileInput
              size="md"
              name={`accountOperator.${index}.documents.2.identifiers`}
              label={t['kymCoopSignature']}
            />
          </Box>
        </FormSection>

        <Box display="flex" justifyContent="flex-end" px="s20" py="s10" alignItems="center">
          <Button
            id="accountOperatorCloseButton"
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
