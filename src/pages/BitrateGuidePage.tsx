import ContentPage from './ContentPage';

export default function BitrateGuidePage() {
  return (
    <ContentPage
      title="How to choose an MP3 bitrate when converting video"
      description="CBR, VBR or ABR, and 128, 192 or 320 kbps? Pick the right MP3 settings for speech, music and file size when you extract audio from a video."
      path="/how-to-choose-an-mp3-bitrate"
    >
      <p>When you turn a video into MP3, the bitrate decides two things: how good the audio sounds and how big the file is. Higher is not always better, because MP3 cannot add quality that was not in the video in the first place.</p>
      <h2>What the bitrate means</h2>
      <p>The bitrate is the amount of data used per second of audio, in kilobits per second (kbps). File size grows in direct proportion: at a constant 128 kbps one minute of audio is about 0.96 MB, at 192 kbps about 1.44 MB, and at 320 kbps about 2.4 MB.</p>
      <h2>CBR, VBR or ABR</h2>
      <ul>
      <li><strong>CBR (constant bitrate)</strong>: the same bitrate for the whole file. The size is predictable and every player handles it. A safe default.</li>
      <li><strong>VBR (variable bitrate)</strong>: the encoder spends more data on complex passages and less on silence. You choose a quality level instead of a bitrate (0 = best, higher numbers = smaller files). Usually the best quality for a given size.</li>
      <li><strong>ABR (average bitrate)</strong>: a middle ground that varies the bitrate but aims at the average you set, so the size stays close to what you expect.</li>
      </ul>
      <h2>Practical starting points</h2>
      <ul>
      <li><strong>Speech</strong> (lectures, podcasts, meetings, voice-overs): 64 to 128 kbps is usually enough and keeps files small.</li>
      <li><strong>Music for everyday listening</strong>: 192 kbps CBR (the default here) or VBR quality 2 to 4.</li>
      <li><strong>Music you want to keep at the highest MP3 quality</strong>: 320 kbps CBR or VBR quality 0.</li>
      <li><strong>Sending over a messaging app or e-mail</strong>: choose a lower bitrate so the file stays under the size limit.</li>
      </ul>
      <h2>Do not exceed the source</h2>
      <p>Phone recordings and many online videos already carry compressed audio, often around 96 to 160 kbps AAC. Converting that to 320 kbps MP3 makes a bigger file but does not make it sound better. If you are unsure, try 192 kbps first and compare it with a higher setting on your own headphones.</p>
      <h2>Set it in the converter</h2>
      <ol>
      <li>Open the converter on the home page and choose your video. Nothing is uploaded; the conversion runs in your browser.</li>
      <li>Pick the encoding type: CBR, VBR or ABR.</li>
      <li>For CBR or ABR move the <strong>Bitrate</strong> slider (64 to 320 kbps); for VBR pick a <strong>VBR quality</strong> level.</li>
      <li>Click Convert to MP3, then listen to the result before you download it.</li>
      </ol>
    </ContentPage>
  );
}
