import { Alert, Box, Button, toast } from '@coop/shared/ui';

const Temp = () => {
  return (
    <Box p="s60" w="50%" mx="auto" display="flex" flexDir="column" gap="s20">
      <Alert status="info" subtitle="Error while processing the request" />
      <Alert status="success" title="Placeholder" showUndo />
      <Alert
        status="warning"
        title="Placeholder"
        subtitle="Error while processing the request"
      />
      <Alert
        status="error"
        title="Placeholder"
        subtitle="Error while processing the request"
      />

      <Box display="flex" alignItems="center" gap="s16">
        <Button
          onClick={() => {
            toast({
              message: 'A thing happened',
              id: 'Toast-123',
              options: {
                duration: Infinity,
              },
              actionText: 'Undo',
              type: 'success',
            });
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            toast({
              message: 'Something terrible happened',
              id: 'Toast-1234',
              options: {
                id: '1236',
                duration: Infinity,
              },
              type: 'error',
            });
          }}
        >
          Error
        </Button>
        <Button
          onClick={() => {
            toast({
              message: 'Something terrible happened',
              id: 'Toast-12345',

              options: {
                id: '1235',
                duration: Infinity,
              },
              type: 'warning',
            });
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            toast({
              message: 'Something terrible happened',
              id: 'Toast-12345',

              options: {
                id: '1234',
                duration: Infinity,
              },
              type: 'info',
            });
          }}
        >
          Info
        </Button>
      </Box>
    </Box>
  );
};

export default Temp;
