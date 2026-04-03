import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      // Don't trigger when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      // '/' or Ctrl+K → focus search
      if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        navigate('/search');
        return;
      }

      // 'h' → home
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        navigate('/');
        return;
      }

      // 'm' → movies
      if (e.key === 'm' && !e.ctrlKey && !e.metaKey) {
        navigate('/movies');
        return;
      }

      // 't' → tv shows
      if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
        navigate('/tv-shows');
        return;
      }

      // 'w' → watchlist
      if (e.key === 'w' && !e.ctrlKey && !e.metaKey) {
        navigate('/my-list');
        return;
      }

      // Escape → go back
      if (e.key === 'Escape') {
        window.history.back();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);
}
