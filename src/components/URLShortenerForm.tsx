import axios from 'axios';
import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import config from 'src/config';

export default function URLShortenerForm() {
  const [destination, setDestination] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${config.SERVER_ENDPOINT}/api/url`, {
        destination,
      });

      if (String(result.status) === '200') {
        setShortUrl(`${config.SERVER_ENDPOINT}/${result.data.shortId}`);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <Box pos="relative" width="100%" height="100%">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        flexDirection="row"
      >
        <form onSubmit={handleSubmit}>
          {destination && (
            <div>
              <strong>Destination</strong>: {destination}
            </div>
          )}
          {shortUrl && (
            <div>
              <strong>Short URL</strong>: {shortUrl}
            </div>
          )}
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Input
              marginBottom="20px"
              marginTop="20px"
              width="20vw"
              minWidth="200px"
              placeholder="https://example.com"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDestination(e.target.value)
              }
            />
            <Button type="submit">Create Short URL</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
