import { FormProvider, useForm } from 'react-hook-form';

import { KymIndMemberInput } from '@coop/shared/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { Box, TextFields } from '@coop/shared/ui';

export const KYMDeclarationAgree = () => {
  const methods = useForm<KymIndMemberInput>();

  return (
    <FormProvider {...methods}>
      <form
      // onFocus={(e) => {
      //   const kymSection = getKymSection(e.target.id);
      //   setKymCurrentSection(kymSection);
      // }}
      >
        <Box display="flex" gap="s16" alignItems="start">
          <FormCheckbox name="declarationAgree" fontSize="s3">
            {''}
          </FormCheckbox>
          <TextFields variant="formInput" mt="-6px">
            I hereby declare that the information provided by me/us in this form
            and documents provided to the co-operative are true and correct. All
            transaction in this account are from legitimate source. If found
            otherwise, I shall bear the consequences thereof.
          </TextFields>
        </Box>
      </form>
    </FormProvider>
  );
};
