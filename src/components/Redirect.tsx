import axios from 'axios';
import { string } from 'yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import config from 'src/config';

export default function Redirect() {
  const params = useParams();

  const redirect = async () => {
    try {
      // get shortId and call to server to get destination
      const { shortId } = params;
      const url = `${config.SERVER_ENDPOINT}/${shortId}` as string;
      const getShortUrl = await axios.get(url);
      const destination = getShortUrl.data?.destination as string;

      const urlSchema = string().matches(
        /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
      );
      const validated = await urlSchema.isValid(destination);

      // check if not valid will throw an error
      if (validated === false) {
        throw new Error(`Destination: ${destination} wrong!`);
      }

      // fix link if destination start with https:// or http://
      if (
        !(
          destination.startsWith('https://') &&
          destination.startsWith('http://')
        )
      ) {
        window.location.href = `https://${destination}`;
      } else {
        window.location.href = destination;
      }
    } catch (error) {
      const locateOrigin = window.location.origin;

      // display error
      toast.error((error as Error).message, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        window.location.href = locateOrigin;
      }, 3000);
    }
  };

  useEffect(() => {
    redirect();
  }, [params, redirect]);

  return null;
}
