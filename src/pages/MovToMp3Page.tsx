import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function MovToMp3Page() {
  usePageMeta({
    title: 'MOV to MP3 — Free QuickTime audio extractor',
    description: 'Turn MOV (QuickTime) videos into MP3 in your browser. No upload, optional bitrate, instant download.',
    path: '/mov-to-mp3',
  });
  return (
    <ConverterPage
      title="MOV to MP3 converter"
      lead="Extract audio from QuickTime MOV files and save as MP3. Private, client-side conversion."
      accept="video/quicktime,.mov"
      formatsLabel="MOV (QuickTime)"
    />
  );
}