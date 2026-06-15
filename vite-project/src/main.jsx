import { createRoot } from 'react-dom/client';
import './index.css';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Properties from './views/Properties/Properties';

const root = createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>

    <h1>Hot Toast</h1>

    <button
      onClick={() => {
        toast.success("This is a success toast!");
      }}
    >
      Click Me
    </button>

    <Toaster />
  </>
);