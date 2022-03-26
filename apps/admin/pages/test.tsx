import { Box } from '@mui/material';
import { FormEventHandler } from 'react';

export default () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('files'));
    const res = await fetch('http://localhost:3334', {
      method: 'POST',
      body: formData,
    }).then((r) => r.json());
  };
  return (
    <Box>
      <form onSubmit={onSubmit} method="POST">
        <input name="files" multiple type="file" />
        <input type="submit" value="Submit" />
      </form>
    </Box>
  );
};
