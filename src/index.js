import { createRoot } from 'react-dom/client';

import App from './component/App/App';

const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App />);
