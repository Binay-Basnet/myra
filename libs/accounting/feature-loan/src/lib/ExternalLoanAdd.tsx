import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  ExternalLoanApplicationInput,
  FrequencyTenure,
  MortageType,
  useGetExternalLoanFormStateQuery,
  useSetExternalLoanMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormBankSelect, FormInput, FormLayout } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import {
  Collateral,
  Documents,
  ExternalLoanInfo,
  FixDeposit,
  Installment,
  Insurance,
  LoanProcessTable,
  LoanTenure,
} from '../component';

/* eslint-disable-next-line */
export interface ExternalLoanAddProps {}

type DocumentType = Record<string, ({ identifier: string; url: string } | null)[]>;

type CustomExternalLoanApplicationInput = Omit<ExternalLoanApplicationInput, 'documents'> & {
  documents: DocumentType;
};

export const ExternalLoanAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<CustomExternalLoanApplicationInput>({
    mode: 'onChange',
    defaultValues: {
      tenureUnit: FrequencyTenure.Day,
      insurance: false,

      // installmentType: LoanRepaymentScheme.Emi,
      // installmentFrequency: InstallmentFrequency.Daily,
      // paymentMethod: ExternalLoanPaymentMethod.Cash,
    },
  });

  const { getValues, watch, reset } = methods;

  const id = router?.query?.['id'];

  const { data: loanFormStateData } = useGetExternalLoanFormStateQuery(
    { id: id as string },
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (loanFormStateData) {
      const queryValues = loanFormStateData?.accounting?.externalLoan?.loan?.formState?.data;

      reset({
        ...queryValues,
        documents: queryValues?.documents?.reduce(
          (docArr, doc) => ({ ...docArr, [doc?.fieldId as string]: doc?.docData ?? [] }),
          {} as DocumentType
        ),
      });
    }
  }, [loanFormStateData]);

  const insurance = watch('insurance');

  const mortageType = watch('mortageType');

  const { mutateAsync } = useSetExternalLoanMutation();

  const submitForm = () => {
    const values = getValues();

    const updatedData = {
      ...values,
      insuranceCompany: insurance ? values?.insuranceCompany : null,
      insurancePremiumAmount: insurance ? values?.insurancePremiumAmount : null,
      insuranceStartDate: insurance ? values?.insuranceStartDate : null,
      insuranceValidUpto: insurance ? values?.insuranceValidUpto : null,
      documents: Object.keys(values?.documents ?? {}).map((fieldName) => ({
        fieldId: fieldName,
        identifiers: values?.documents?.[fieldName]?.map((doc) => doc?.identifier) ?? [],
      })),
    };

    asyncToast({
      id: 'external-loan-id',
      msgs: {
        success: 'Saving External Loan',
        loading: 'External Loan Saved',
      },
      onSuccess: () => router.push(ROUTES.ACCOUNTING_EXTERNAL_LOAN_LIST),
      promise: id
        ? mutateAsync({ id: id as string, data: updatedData as ExternalLoanApplicationInput })
        : mutateAsync({ data: updatedData as ExternalLoanApplicationInput }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanApplicationInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New External Loan" />

      <FormLayout.Content>
        <FormLayout.Form>
          <ExternalLoanInfo />

          <LoanTenure />

          <Installment />

          {mortageType === MortageType.Collateral && <Collateral />}
          {mortageType === MortageType.LoanAgainstFd && <FixDeposit />}

          <FormSection templateColumns={1}>
            <LoanProcessTable />
          </FormSection>

          <Insurance />

          <FormSection header="Transaction Method">
            <FormBankSelect name="bankId" label="Bank" />
          </FormSection>

          <FormSection header="Representative Information">
            <GridItem colSpan={2}>
              <FormInput name="nameOfRepresentative" type="text" label="Name of Representative" />
            </GridItem>
            <FormInput name="position" type="text" label="Position" />
          </FormSection>

          <Documents />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel={t['save']} mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default ExternalLoanAdd;
