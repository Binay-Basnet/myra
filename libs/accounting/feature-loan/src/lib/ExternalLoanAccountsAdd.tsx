import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { FormInput, FormMap, FormSelect, FormTextArea } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanAccountsProps {}

export const ExternalLoanAccountsAdd = () => {
  const { t } = useTranslation();
  const methods = useForm();

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title="New External Loan" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <GridItem colSpan={3}>
                  <FormInput name="dueDate" type="text" label="Name" />
                </GridItem>
              </FormSection>

              <FormSection header="Address">
                <FormSelect name="select" label="Province" options={[]} />
                <FormSelect name="select" label="District" options={[]} />
                <FormSelect name="select" label="Local Government" options={[]} />

                <FormSelect name="select" label="Ward No" options={[]} />
                <FormSelect name="select" label="Locality" options={[]} />
                <FormInput name="reference" type="text" label="House No" />

                <GridItem colSpan={2}>
                  <FormMap name="permanentAddress.coordinates" />
                </GridItem>
              </FormSection>

              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormTextArea name="reference" label="Notes" />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
          />
        </Container>
      </Box>
    </>
  );
};
