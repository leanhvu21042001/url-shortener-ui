import { Container } from '@chakra-ui/react';
import Background from './components/Background';
import URLShortenerForm from './components/URLShortenerForm';

function App() {
  return (
    <div className="app">
      <Container width="100vw" height="100vh">
        <URLShortenerForm />
        <Background />
      </Container>
    </div>
  );
}

export default App;
