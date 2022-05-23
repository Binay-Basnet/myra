import React from 'react';
import { UseFormReturn, FormProvider, SubmitHandler } from 'react-hook-form';
import { FormGenerator, DataSchema } from './FormGenerator';

interface IFormProps<T> {
  methods: UseFormReturn<T, unknown>; //! TODO replace this unknown
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
}
export default function Form<T>(props: IFormProps<T>) {
  const { methods, children, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export { Form, FormGenerator, DataSchema };
