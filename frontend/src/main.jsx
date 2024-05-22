import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relative from "dayjs/plugin/relativeTime";

dayjs.extend(advancedFormat);
dayjs.extend(relative);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
