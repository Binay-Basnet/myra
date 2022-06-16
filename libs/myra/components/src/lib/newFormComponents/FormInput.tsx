import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import {
  Box,
  FormInput as BaseFormInput,
  FormInputProps,
} from '@coop/shared/ui';

interface IFormInputProps<T> extends FormInputProps {
  control?: Control<T>;
  name: Path<T>;
}

export function FormInput<T>({
  placeholder,
  name,
  type,
  ...rest
}: IFormInputProps<T>) {
  const methods = useFormContext();

  const {
    formState: { errors },
    control: formControl,
  } = methods;

  const error = errors[name];

  return (
    <Box>
      <Controller
        control={formControl}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseFormInput
            id={name}
            placeholder={placeholder ?? 'Enter'}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
      />
      {error ? error?.message : null}
    </Box>
  );
}

//
//
//
// import { Control, Controller, Path, useFormContext } from 'react-hook-form';
// import { Box, TextInput, TextInputProps } from '@coop/shared/ui';
//
// interface IFormInputProps<T> extends TextInputProps {
//   control?: Control<T>;
//   name: Path<T>;
// }
//
// export function FormInput<T>({
//                                placeholder,
//                                name,
//                                type,
//                                control,
//                                ...rest
//                              }: IFormInputProps<T>) {
//   const methods = useFormContext();
//
//   const error = methods?.formState?.errors[name];
//
//   return (
//       <Box>
//         {methods?.formState ? (
//             <Controller
//                 control={methods.control}
//                 name={name}
//                 render={({ field: { onChange } }) => (
//                     <TextInput
//                         id={name}
//                         placeholder={placeholder}
//                         name={name}
//                         type={type}
//                         onChange={onChange}
//                         {...rest}
//                     />
//                 )}
//             />
//         ) : control ? (
//             <Controller
//                 control={control}
//                 name={name}
//                 render={({ field: { onChange } }) => (
//                     <TextInput
//                         id={name}
//                         placeholder={placeholder}
//                         name={name}
//                         type={type}
//                         onChange={onChange}
//                         {...rest}
//                     />
//                 )}
//             />
//         ) : (
//             <TextInput
//                 id={name}
//                 placeholder={placeholder}
//                 name={name}
//                 type={type}
//                 {...rest}
//             />
//         )}
//
//         {error ? error?.message : null}
//       </Box>
//   );
// }
