import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';

import { KymCoopAccountOperatorDetailsFormInput } from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormDatePicker, FormInput, FormSwitch } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { BottomOperatorCoop } from './accountOperatorDocuments';
import { DynamicAddtraining } from './acoountOperatorTraining';
import { useAccountOperators } from '../hooks/useAccountOperators';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  accountId: string;
}

export const AddOperator = ({ removeDirector, setKymCurrentSection, accountId }: IAddDirector) => {
  const { t } = useTranslation();

  const methods = useForm<KymCoopAccountOperatorDetailsFormInput>();

  useAccountOperators({ accountId, methods });

  const { watch } = methods;

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(`isPermanentAndTemporaryAddressSame`);

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
          <Text fontSize="r1">{`Account Operator `}</Text>
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
              removeDirector(accountId);
            }}
          />
        )}
      </Box>

      <Collapse
        in={isOpen}
        style={{ marginTop: '0px', border: '1px solid', borderColor: '#E0E5EB' }}
      >
        <DynamicBoxGroupContainer>
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setKymCurrentSection(kymSection);
              }}
            >
              <Box display="flex" flexDirection="column" gap="s48">
                <FormSection>
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="nameEn"
                    label={t['kymCoopFullName']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="designation"
                    label={t['kymCoopDesignation']}
                  />
                </FormSection>

                <FormAddress
                  sectionId="accountOperatorCoop"
                  sectionHeader="kymCoopPermanentAddress"
                  name="permanentAddress"
                />

                <FormSection header="kymCoopTemporaryAddress">
                  <GridItem colSpan={3}>
                    <FormSwitch
                      name="isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopTemporaryAddressPermanent']}
                    />
                  </GridItem>

                  {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
                </FormSection>

                <FormSection>
                  <FormDatePicker
                    id="accountOperatorCoop"
                    name="dateOfMembership"
                    label={t['kymCoopDateOfMembership']}
                  />
                  <FormInput
                    type="text"
                    id="accountOperatorCoop"
                    name="highestQualification"
                    label={t['kymCoopHighestQualification']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="number"
                    name="contactNumber"
                    label={t['kymCoopMobileNo']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="email"
                    label={t['kymCoopEmail']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="string"
                    name="citizenshipNo"
                    label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="string"
                    name="panNo"
                    label={t['kymCoopPanOrVatNo']}
                  />
                </FormSection>
                <DynamicAddtraining />
              </Box>
            </form>
          </FormProvider>
          {/* <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotograph']}
                name={`accountOperatorsDetails.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotographOfIdentityProofDocument']}
                name={`accountOperatorsDetails.identityDocumentPhoto`}
              />
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopSignature']}
                  name={`boardOfDirectorsDetails.signature`}
                />
              </Box>
            </Grid> */}
          <BottomOperatorCoop accountId={accountId} setKymCurrentSection={setKymCurrentSection} />
        </DynamicBoxGroupContainer>
        <Box display="flex" justifyContent="flex-end" px="s20" py="s10" alignItems="center">
          <Button
            id="accountOperatorCloseButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(accountId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
