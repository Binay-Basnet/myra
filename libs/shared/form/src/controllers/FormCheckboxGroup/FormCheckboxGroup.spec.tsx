import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormCheckboxGroup from './FormCheckboxGroup';

describe('FormCheckboxGroup', () => {
  it('should render successfully', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const formMethods = useForm();

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };
    const { baseElement } = render(
      <Wrapper>
        <FormCheckboxGroup
          name="test"
          list={[{ label: 'test', value: 'test' }]}
        />
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
