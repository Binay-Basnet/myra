import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

import FormSwitchTab from './FormSwitchTab';

describe('FormSwitchTab', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <Wrapper>
        <FormSwitchTab name="139" options={[{ label: 'Yes', value: 'yes' }]} />{' '}
      </Wrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
