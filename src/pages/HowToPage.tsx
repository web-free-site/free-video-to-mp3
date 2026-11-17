import ContentPage from './ContentPage';

export default function HowToPage() {
  return (
    <ContentPage
      title="How to convert a video to MP3 in the browser"
      description="Step-by-step guide to turning MP4, MOV, or WebM into MP3 without uploading files to a server."
      path="/how-to-convert-a-video-to-mp3-in-the-browser"
    >
      <ol>
        <li>Open the Free Video to MP3 Converter on this site.</li>
        <li>Click or tap to choose a video from your device (MP4, MOV, WebM, or another common format).</li>
        <li>Wait for the preview panel to show duration and audio tracks.</li>
        <li>Select MP3 bitrate or VBR quality.</li>
        <li>Click Convert to MP3. The first run downloads the FFmpeg encoder (cached afterward).</li>
        <li>Download the MP3 or listen in the built-in player.</li>
      </ol>
      <p>
        Nothing is uploaded: conversion uses ffmpeg.wasm inside your tab. Close the tab when finished to free memory on
        large files.
      </p>
    </ContentPage>
  );
}