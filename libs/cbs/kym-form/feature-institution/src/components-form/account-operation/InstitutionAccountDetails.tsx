import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BottomDocument } from './components/BottomComponents';

interface IAddDirector {
  removeDirector: () => void;
  index: number;
}

const AddAccountDetails = ({ removeDirector, index }: IAddDirector) => {
  const { t } = useTranslation();

  const { watch } = useFormContext<KymInsInput>();

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `accountOperator.${index}.isTemporaryAndPermanentAddressSame`
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        borderRadius="br2"
        borderBottomRadius={isOpen ? '0' : 'br2'}
        overflow="hidden"
      >
        <Box
          flex={1}
          px="s16"
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">Account Operator {index + 1}</Text>
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
            onClick={() => {
              removeDirector();
            }}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px', borderRadius: 'br2', overflow: 'hidden' }}>
        <SectionContainer
          mt="0"
          pt="s16"
          border="1px solid"
          borderColor="border.layout"
          borderBottom="0px"
          pb="s20"
        >
          <Box display="flex" flexDirection="column">
            <FormSection>
              <FormInput
                isRequired
                id="AccountOperatorInstitution"
                type="text"
                name={`accountOperator.${index}.name`}
                label={t['kymInsFullName']}
              />
              <FormInput
                isRequired
                id="AccountOperatorInstitution"
                type="text"
                name={`accountOperator.${index}.contact`}
                label={t['kymInsContactNo']}
              />
              <FormInput
                isRequired
                id="AccountOperatorInstitution"
                type="text"
                name={`accountOperator.${index}.email`}
                label={t['kymInsEmail']}
              />
            </FormSection>

            <FormSection header="kymInsPermanentAddress">
              <FormAddress name={`accountOperator.${index}.permanentAddress`} />
            </FormSection>

            <Box
              id="Temporary Address"
              pt="s20"
              display="flex"
              flexDirection="column"
              scrollMarginTop="200px"
            >
              <Box display="flex" flexDirection="column" gap="s16" px="s20">
                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymInsTemporaryAddress']}
                </Text>

                <FormSwitch
                  id="AccountOperatorInstitution"
                  name={`accountOperator.${index}.isTemporaryAndPermanentAddressSame`}
                  label={t['kymInsTemporaryAddressPermanent']}
                />
              </Box>

              <FormSection>
                {!isPermanentAndTemporaryAddressSame && (
                  <FormAddress
                    sectionId="AccountOperatorInstitution"
                    name={`accountOperator.${index}.temporaryAddress`}
                  />
                )}
              </FormSection>
            </Box>
          </Box>
          <Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-start" gap="s16">
              <Box px="s20" py="s16" display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="s20">
                <FormSelect
                  isRequired
                  id="AccountOperatorInstitution"
                  name={`accountOperator.${index}.designation`}
                  label={t['kymInsDesignation']}
                  options={[
                    { value: 'President', label: 'President' },
                    { value: 'Vice President', label: 'Vice-President' },
                    { value: 'Secretary', label: 'Secretary' },
                    { value: 'Treasurer', label: 'Treasurer' },
                  ]}
                />
                <FormInput name={`accountOperator.${index}.panNo`} label={t['kymInsPanNo']} />
                <BottomDocument index={index} />
              </Box>
            </Box>
          </Box>
        </SectionContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          borderTopColor="none"
          border="1px solid"
          borderColor="border.layout"
          alignItems="center"
          h="60px"
          px="s20"
          borderBottomRadius="br2"
        >
          <Button
            id="accountOperatorClose"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector();
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

export const InstitutionKYMAccountDetail = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<KymInsInput>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'accountOperator',
  });

  return (
    <FormSection id="kymInsDetailsofAccountOperators" header="kymInsDetailsofAccountOperators">
      {fields.map((field, index) => (
        <GridItem colSpan={3} key={field.id} display="flex" flexDirection="column">
          <AddAccountDetails removeDirector={() => remove(index)} index={index} />
        </GridItem>
      ))}
      <GridItem colSpan={2}>
        <Button
          id="accountOperatorDetailsButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            append({ documents: [{ fieldId: 'specimenSignature', identifiers: [] }] });
          }}
        >
          {t['kymInsNewOperator']}
        </Button>
      </GridItem>
    </FormSection>
  );
};
