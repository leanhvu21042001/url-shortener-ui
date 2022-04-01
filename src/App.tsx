import { Container } from '@chakra-ui/react';
import Background from './components/Background';
import URLShortenerForm from './components/URLShortenerForm';

function App() {
  return (
    <div className="app">
      <Container width="100vw" height="100vh">
        <Background />
        <URLShortenerForm />
      </Container>
    </div>
  );
}

export default App;
