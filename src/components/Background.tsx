import { Image } from '@chakra-ui/react';
import useWindowDimensions from 'src/hooks/use-window-dimensions';

function Background() {
  const { width, height } = useWindowDimensions();
  const image = `https://source.unsplash.com/random/${width}x${height}`;

  return (
    <Image
      position="fixed"
      top="0"
      left="0"
      bottom="0"
      right="0"
      zIndex="-1"
      src={image}
      alt="bg"
    />
  );
}

export default Background;
