import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from '@/App';
    import '@/index.css';
    import { BrowserRouter } from 'react-router-dom';
    import { LanguageProvider } from '@/context/LanguageContext';

    const AppWrapper = () => {
      return (
        <React.StrictMode>
          <LanguageProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </React.StrictMode>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);