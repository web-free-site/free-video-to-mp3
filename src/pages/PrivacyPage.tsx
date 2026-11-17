import ContentPage from './ContentPage';

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy policy"
      description="Free Video to MP3 Converter privacy: local processing, ads, and cached FFmpeg files."
      path="/privacy"
    >
      <p>
        Your video and audio files are processed locally in your browser. We do not receive, store, or analyze your
        media on our servers.
      </p>
      <p>
        The FFmpeg WebAssembly core may be downloaded from our configured CDN and stored in your browser cache
        (Cache API).
      </p>
      <p>
        This site displays advertisements (Adsterra). Ad partners may set cookies or use identifiers according to their
        policies. We do not use Google AdSense.
      </p>
      <p>Contact: see the Contact page.</p>
    </ContentPage>
  );
}