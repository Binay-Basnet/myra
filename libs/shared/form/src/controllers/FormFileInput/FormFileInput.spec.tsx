import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import { FormFileInput } from './FormFileInput';

describe('FormFileInput', () => {
  it('should render successfully', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const formMethods = useForm();

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };
    const { baseElement } = render(
      <Wrapper>
        <FormFileInput name="fileTest" />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
