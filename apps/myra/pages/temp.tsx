import { FormProvider, useForm } from 'react-hook-form';

import { FormFileInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';

const Temp = () => {
  const methods = useForm({
    defaultValues: {
      file: [
        {
          url: 'https://images.unsplash.com/photo-1657037029325-be5c4f1d4dfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          fileName: 'nightlight.jpg',
        },
      ],
      switch: true,
    },
  });

  const fileWatch = methods.watch('file');

  console.log(fileWatch);

  return (
    <Box p="s32" bg="white">
      <FormProvider {...methods}>
        {/*<img src="https://cdn.raralabs.live/myra/34d9839a-79b1-4337-907e-d8908e7d16fc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jMeXgnuLUIGDH6vb%2F20220706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220706T105452Z&X-Amz-Expires=1000&X-Amz-SignedHeaders=host&X-Amz-Signature=fff6dec85fca8985d3226ee5b0de7bfcf3cbf212e67e2950332b23d788e3ba40" />*/}
        <FormFileInput name="file" size="lg" />
        <FormSwitchTab
          name={'switch'}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
        />
      </FormProvider>
    </Box>
  );
};

export default Temp;
