import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.js';
import './index.css'
import './TranslationAdmin/i18n.js'

createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
    <AppRouter />
    </QueryClientProvider>


)
