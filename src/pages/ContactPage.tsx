import ContentPage from './ContentPage';

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact"
      description="Contact information for Free Video to MP3 Converter."
      path="/contact"
    >
      <p>
        For questions about this converter, open an issue on the project repository or reach the maintainers through the{' '}
        <a href="https://web-free.site/">web-free.site</a> hub contact links.
      </p>
    </ContentPage>
  );
}