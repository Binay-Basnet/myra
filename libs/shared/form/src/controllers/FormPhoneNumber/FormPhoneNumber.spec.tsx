import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormPhoneNumber from './FormPhoneNumber';

describe('FormPhoneNumber', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <Wrapper>
        <FormPhoneNumber name={'phoneTest'} />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
