import axios from 'axios';
import ClipboardJS from 'clipboard';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

import config from 'src/config';

new ClipboardJS('.button');

export default function URLShortenerForm() {
  const [destination, setDestination] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setDestination(event.currentTarget.value);
    setShortUrl('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${config.SERVER_ENDPOINT}/api/url`, {
        destination,
      });

      if (String(result.status) === '200') {
        console.log(result);
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
        bgColor="AppWorkspace"
        padding="4rem"
        borderRadius="2rem"
      >
        <form onSubmit={handleSubmit}>
          {destination && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <strong>Destination</strong>:
              <Input type="text" readOnly value={destination} border="none" />
            </Box>
          )}
          {shortUrl && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <strong style={{ width: '20vw' }}>Short URL</strong>:
              <Input
                id="input"
                type="text"
                readOnly
                defaultValue={shortUrl}
                border="none"
              />
              <Button
                type="button"
                className="button"
                data-clipboard-action="copy"
                data-clipboard-target="#input"
              >
                Copy
              </Button>
            </Box>
          )}
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Input
              marginBottom="20px"
              marginTop="20px"
              width="20vw"
              minWidth="50vw"
              placeholder="https://example.com"
              onChange={handleInputChange}
            />
            <Button type="submit">Create Short URL</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
