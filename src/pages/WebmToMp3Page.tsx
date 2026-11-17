import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function WebmToMp3Page() {
  usePageMeta({
    title: 'WebM to MP3 — Free online converter',
    description: 'Convert WebM video to MP3 in the browser. No server upload. Works on desktop and mobile.',
    path: '/webm-to-mp3',
  });
  return (
    <ConverterPage
      title="WebM to MP3 converter"
      lead="Save the audio track from WebM files as MP3. 100% in-browser with FFmpeg WebAssembly."
      accept="video/webm,.webm"
      formatsLabel="WebM"
    />
  );
}