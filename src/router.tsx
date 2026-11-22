import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import HomePage from './pages/HomePage';
import Mp4ToMp3Page from './pages/Mp4ToMp3Page';
import MovToMp3Page from './pages/MovToMp3Page';
import WebmToMp3Page from './pages/WebmToMp3Page';
import HowToPage from './pages/HowToPage';
import BitrateGuidePage from './pages/BitrateGuidePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'mp4-to-mp3', element: <Mp4ToMp3Page /> },
      { path: 'mov-to-mp3', element: <MovToMp3Page /> },
      { path: 'webm-to-mp3', element: <WebmToMp3Page /> },
      { path: 'how-to-convert-a-video-to-mp3-in-the-browser', element: <HowToPage /> },
      { path: 'how-to-choose-an-mp3-bitrate', element: <BitrateGuidePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

export default router;