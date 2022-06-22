import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormEmailInput from './FormEmailInput';

describe('FormEmailInput', () => {
  it('should render successfully', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const formMethods = useForm();

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };

    const { baseElement } = render(
      <Wrapper>
        <FormEmailInput name="emailTest" />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
