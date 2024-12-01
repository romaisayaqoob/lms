// pages/_app.js
import '../styles/globals.css'
import { AuthContextProvider } from './context/AuthContext'; // Import from the context folder

function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default App;
