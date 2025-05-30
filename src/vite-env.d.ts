/// <reference types="vite/client" />
    
    interface ImportMetaEnv {
      // Ajoutez ici vos variables d'environnement personnalisées si nécessaire
      // readonly VITE_API_KEY: string
    }
    
    interface ImportMeta {
      readonly env: ImportMetaEnv
    }