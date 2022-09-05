import { FormProvider, useForm } from 'react-hook-form';

import ShareReturnPayment from '../components/form/ShareReturnPayment';

export function CbsShareReturnPayment() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ShareReturnPayment />
    </FormProvider>
  );
}

export default CbsShareReturnPayment;
