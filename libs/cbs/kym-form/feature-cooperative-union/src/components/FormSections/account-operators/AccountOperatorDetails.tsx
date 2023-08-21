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
  FormFileInput,
  FormInput,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { AccountOperatorTraining } from './accountOperatorTraining';

interface IAddDirectorProps {
  removeAccount: () => void;
  index: number;
}

const AddDirector = ({ removeAccount, index }: IAddDirectorProps) => {
  const { t } = useTranslation();

  // const methods = useForm<CoopUnionPersonnelInput>();

  const { watch } = useFormContext<CoopUnionInstitutionInformationInput>();

  // useCoopUnionAccountOperator({ methods, accountOpId: accountOperatorId });

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `accountOperators.${index}.isPermanentAndTemporaryAddressSame`
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
          h="60px"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
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
            onClick={() => removeAccount()}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <Box p="s20" border="1px solid" borderColor="border.layout" borderRadius="4px">
          <SectionContainer>
            <Box display="flex" flexDirection="column" gap="s32">
              <Box display="flex" flexDirection="column" gap="s16">
                <InputGroupContainer>
                  <FormInput
                    isRequired
                    type="text"
                    name={`accountOperators.${index}.fullName`}
                    id="accountOperators.fullName"
                    label={t['kymCoopUnionOpFullName']}
                  />
                  <FormInput
                    isRequired
                    type="text"
                    name={`accountOperators.${index}.designationEn`}
                    id="accountOperators.designationEn"
                    label={t['kymCoopUnionOpDesignation']}
                  />
                </InputGroupContainer>

                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymCoopUnionOpPermanentAddress']}
                </Text>

                <InputGroupContainer>
                  <FormAddress name={`accountOperators.${index}.permanentAddress`} />
                </InputGroupContainer>

                <Box />
              </Box>

              <Box
                id="Temporary Address"
                gap="s16"
                display="flex"
                flexDirection="column"
                scrollMarginTop="200px"
              >
                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymCoopUnionOpTemporaryAddress']}
                </Text>

                <FormSwitch
                  name={`accountOperators.${index}.isPermanentAndTemporaryAddressSame`}
                  id="accountOperators.isPermanentAndTemporaryAddressSame"
                  label={t['kymCoopUnionOpTemporaryAddressPermanent']}
                />

                {!isPermanentAndTemporaryAddressSame && (
                  <>
                    <InputGroupContainer>
                      <FormAddress name={`accountOperators.${index}.temporaryAddress`} />
                    </InputGroupContainer>

                    <Box mt="-16px" />
                  </>
                )}
              </Box>
              <InputGroupContainer>
                <FormDatePicker
                  name={`accountOperators.${index}.dateOfMembership`}
                  id="accountOperators.dateOfMembership"
                  label={t['kymCoopUnionOpDateOfMembership']}
                />
                <FormInput
                  type="text"
                  name={`accountOperators.${index}.highestQualification`}
                  id="accountOperators.highestQualification"
                  label={t['kymCoopUnionOpHighestQualification']}
                />
                <FormInput
                  isRequired
                  type="number"
                  name={`accountOperators.${index}.mobileNumber`}
                  id="accountOperators.mobileNumber"
                  label={t['kymCoopUnionOpMobileNo']}
                />
                <FormInput
                  isRequired
                  type="text"
                  name={`accountOperators.${index}.email`}
                  id="accountOperators.email"
                  label={t['kymCoopUnionOpEmail']}
                />
                <FormInput
                  isRequired
                  type="string"
                  name={`accountOperators.${index}.citizenshipNo`}
                  id="accountOperators.citizenshipNo"
                  label={t['kymCoopUnionOpCitizenshipPassportDrivingLicenseNo']}
                />

                <FormInput
                  isRequired
                  type="string"
                  name={`accountOperators.${index}.panNo`}
                  id="centralRepresentative.panNo"
                  label={t['kymCoopUnionPANNo']}
                />
              </InputGroupContainer>
              {/* <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopUnionOpTrainingRelatedToCoop']}
            </Text>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`accountOperators.${index}.fullName`} name={`subjectOfTraining`}
                label={t['kymCoopUnionOpSubjectofTraining']}
              />
              <FormInput
                type="date"
                name={`accountOperators.${index}.fullName`} name={`dateOfTraining`}
                label={t['kymCoopUnionOpDateofTraining']}
              />
              <FormInput
                type="number"
                name={`accountOperators.${index}.fullName`} name={`trainingOrganization`}
                label={t['kymCoopUnionOpTrainingOrganization']}
              />
            </InputGroupContainer> */}

              <AccountOperatorTraining accountOperatorIndex={index} />
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" mt="s32" columnGap="s20">
              <FormFileInput
                label={t['kymCoopUnionOpPhotograph']}
                name={`accountOperators.${index}.documents.0.identifiers`}
              />
              <FormFileInput
                label={t['kymCoopUnionOpPhotographOfIdentityProofDocument']}
                name={`accountOperators.${index}.documents.1.identifiers`}
              />
              <Box w="124px">
                <FormFileInput
                  size="md"
                  name={`accountOperators.${index}.documents.2.identifiers`}
                  label={t['kymCoopUnionOpSpecimenSignature']}
                />
              </Box>
            </Grid>
          </SectionContainer>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          border="1px solid"
          borderColor="border.layout"
          alignItems="center"
          h="60px"
          px="s20"
        >
          {/* <Button
            variant="ghost"
            leftIcon={<GrRotateRight />}
            onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button> */}
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => removeAccount()}
            id="accountOperator.accountOperatorButton"
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

export const AccountOperatorInfo = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<CoopUnionInstitutionInformationInput>();

  const { fields, append, remove } = useFieldArray({ name: 'accountOperators', control });

  return (
    <FormSection
      id="kymCoopUnionAccDetailsofAccountOperators"
      header="kymCoopUnionDetailsOfAccountOperators"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {fields.map((field, index) => (
            <Box
              key={field.id}
              display="flex"
              flexDirection="column"
              id="Details of Account Operators"
              scrollMarginTop="200px"
            >
              <AddDirector index={index} removeAccount={() => remove(index)} />
            </Box>
          ))}
          <GridItem colSpan={1}>
            <Button
              id="accountOperator.accountOperatorButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => {
                append({
                  documents: [
                    { fieldId: 'photograph', identifiers: [] },
                    { fieldId: 'identityDocumentPhoto', identifiers: [] },
                    { fieldId: 'signature', identifiers: [] },
                  ],
                });
              }}
            >
              {t['kymCoopUnionAddOperator']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};
