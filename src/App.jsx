import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MyListProvider } from './context/MyListContext';
import Layout from './components/layout/Layout';
import Loader from './components/ui/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const TvDetailPage = lazy(() => import('./pages/TvDetailPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const TvShowsPage = lazy(() => import('./pages/TvShowsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const MyListPage = lazy(() => import('./pages/MyListPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PersonDetailPage = lazy(() => import('./pages/PersonDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoaderPreviewPage = lazy(() => import('./pages/LoaderPreviewPage'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="movie/:id" element={<MovieDetailPage />} />
                <Route path="tv/:id" element={<TvDetailPage />} />
                <Route path="person/:id" element={<PersonDetailPage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="tv-shows" element={<TvShowsPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="my-list" element={<MyListPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="loader" element={<LoaderPreviewPage />} />
                <Route path="loader/:type" element={<LoaderPreviewPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
