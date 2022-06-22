import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormCheckbox from './FormCheckbox';

describe('FormCheckbox', () => {
  it('should render successfully', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const formMethods = useForm();

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };

    const { baseElement } = render(
      <Wrapper>
        <FormCheckbox name="test" />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
