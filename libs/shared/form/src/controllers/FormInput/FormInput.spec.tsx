import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormInput from './FormInput';

describe('FormInput', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <Wrapper>
        <FormInput name="test" />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
