import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function Mp4ToMp3Page() {
  usePageMeta({
    title: 'MP4 to MP3 — Free browser converter',
    description: 'Convert local MP4 videos to MP3 online. Extract audio without uploading. Free, private, in-browser.',
    path: '/mp4-to-mp3',
  });
  return (
    <ConverterPage
      title="MP4 to MP3 converter"
      lead="Convert MP4 files from your phone or computer to MP3. Everything runs locally in your browser."
      accept="video/mp4,.mp4,.m4v"
      formatsLabel="MP4 and M4V"
    />
  );
}