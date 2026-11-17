import ContentPage from './ContentPage';

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of use"
      description="Terms for using the Free Video to MP3 Converter."
      path="/terms"
    >
      <p>You may use this converter for lawful personal purposes. You must own or have rights to the files you convert.</p>
      <p>
        The service is provided as-is without warranty. FFmpeg is licensed under the LGPL; application code is MIT. See
        the About page for details.
      </p>
      <p>Do not use this tool to circumvent copyright or platform terms of third-party content you do not control.</p>
    </ContentPage>
  );
}