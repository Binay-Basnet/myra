import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormAmounInput from './FormAmounInput';

describe('FormAmounInput', () => {
  it('should render successfully', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const formMethods = useForm();

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };
    const { baseElement } = render(
      <Wrapper>
        <FormAmounInput name="testAmount" />{' '}
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
