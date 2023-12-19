import { CacheProvider } from '@emotion/react';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Spinner from '@core/components/spinner';
import { BlankLayout } from '@core/layouts/BlankLayout';
import ThemeComponent from '@core/theme/ThemeComponent.jsx';
import { createEmotionCache } from '@core/utils/create-emotion-cache';

import { HomePage, LoginPage, UserProfile } from '@routes';

import { AuthProvider } from '@context/authContext.jsx';
import { SettingsConsumer, SettingsProvider } from '@context/settingsContext';

import { useAuth } from '@hooks/useAuth';

import { UserLayout } from '@layouts/UserLayout';
import TabAccount from '@layouts/components/UserSettings/TabAccount';
import ProfileTab from '@layouts/components/profile/ProfileTab';

// import UserProfile from '@layouts/components/profile/UserProfile';
import '../styles/globals.css';
import AboutOverivew from './layouts/components/profile/AboutOverivew';
import Form from './routes/forms';
import UserList from './routes/forms/userList';
import Preview from './routes/forms/preview';

const Guard = ({ children }) => {
  const auth = useAuth();
  if (auth.loading) return <Spinner />;
  return <>{children}</>;
};

const clientSideEmotionCache = createEmotionCache();

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};

const ProtectedGuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return children;
  }
  return <Navigate to="/" />;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      navigate(location.pathname.slice(0, -1));
    }
    if (location.pathname !== '/login') NProgress.start();
    // Time 1 second for demo
    setTimeout(() => {
      NProgress.done();
    }, 1000);
    // NProgress.done();
  }, [location.pathname]);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <AuthProvider>
        <Toaster />
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <Guard>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <>
                            <ProtectedRoute>
                              <UserLayout />
                            </ProtectedRoute>
                          </>
                        }
                      >
                        <Route index element={<HomePage />} />
                        <Route path='/form' element={<Form />} />
                        <Route path='/userlist' element={<UserList />} />
                        <Route path='/preview' element={<Preview />} />
                        {/* <Route path="/second-page" element={<SecondPage />} /> */}
                        <Route path="/profile" element={<UserProfile />}>
                          <Route index element={<ProfileTab />} />
                          <Route
                            path="/profile/teams"
                            element={<AboutOverivew />}
                          />
                        </Route>
                        <Route path="/settings" element={<TabAccount />} />
                      </Route>
                      <Route
                        path="/"
                        element={
                          <>
                            <ProtectedGuestRoute>
                              <BlankLayout />
                            </ProtectedGuestRoute>
                          </>
                        }
                      >
                        <Route path="/login" element={<LoginPage />} />
                      </Route>
                      <Route path="/" element={<BlankLayout />}>
                        <Route path="*" element={<h1>Not Found</h1>} />
                      </Route>
                    </Routes>
                  </Guard>
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
