import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormSlugInput from './FormSlugInput';

describe('FormSlugInput', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <Wrapper>
        <FormSlugInput name={'slugTest'} />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
