import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// removed react-hot-toast to avoid runtime dependency issues in dev
// App imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Properties from './views/Properties/Properties';
import PropertyDetail from './views/PropertyDetail/PropertyDetail';

const root = createRoot(document.getElementById("root"));

try {
  console.log('APP MOUNT: starting root.render');
  class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info); }
    render() { if (this.state.error) return <div className="app-error">App render error: {String(this.state.error)}</div>; return this.props.children; }
  }

  root.render(
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/about" element={<About />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
  console.log('APP MOUNT: render completed');
} catch (err) {
  console.error('APP MOUNT ERROR:', err && err.stack ? err.stack : err);
}