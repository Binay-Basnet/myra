import React from 'react';
import {FormProvider, SubmitHandler, UseFormReturn} from 'react-hook-form';

import {FormGenerator} from './FormGenerator';

interface IFormProps<T> {
  methods: UseFormReturn<T, unknown>; //! TODO replace this unknown
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  onChange?: (e: React.FormEvent<HTMLFormElement>) => void;
}

// TODO:
// 1. Trigger errors conditionally trigger (setError)
// 2. Trigger Api Calls from the components internally
// 3. Implement Layout props

export default function Form<T>(props: IFormProps<T>) {
  const {methods, children, onSubmit, onChange} = props;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onChange={(e) => {
          onChange && onChange(e);
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export type {DataSchema, DefaultFieldTypes, Dependencies} from './types';
export {Form, FormGenerator};
