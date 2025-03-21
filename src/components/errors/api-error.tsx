import { Box } from '@mui/material';

export const ApiError = ({ messages }: { messages: string[] }) => {
  if (messages.length <= 0) {
    return null;
  }

  return (
    <Box
      sx={{
        color: 'red',
        border: '1px solid red',
        borderRadius: '5px',
        fontSize: '15px',
        textAlign: 'left',
        mb: 2
      }}
    >
      <ul>
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </Box>
  );
};
