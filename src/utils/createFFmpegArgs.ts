import { FORMATS, type Codec, type FormatSettings } from '../formats';

export const sanitizeFilename = (name: string): string =>
  name.trim().replace(/[/\\:*?"<>|\u0000-\u001f]/g, '_').replace(/^-/, '_');

export const STEREO_AT_MOST = ['-af', 'aformat=channel_layouts=mono|stereo'];

const downmixArgs = (stereoOnly: boolean | undefined, downmixToStereo: boolean): string[] =>
  stereoOnly ? STEREO_AT_MOST : downmixToStereo ? ['-ac', '2'] : [];

export type AudioTrack = number | 'all';

export interface Trim {
  start: number;
  end: number;
}

export const allowsAllAudioTracks = (): boolean => false;

/** Build FFmpeg arguments that convert `inputFilename` to MP3. */
export const createFFmpegArgs = (
  inputFilename: string,
  codec: Codec,
  settings: FormatSettings,
  outputName: string,
  audioTrack: AudioTrack,
): { ffmpegArgs: string[]; outputFilename: string } => {
  const format = FORMATS[codec];
  if (audioTrack !== 0 && audioTrack !== 'all') {
    throw new Error('Choose a valid audio track.');
  }

  const args = ['-map', audioTrack === 'all' ? '0:a' : `0:a:${audioTrack}`];
  args.push(...format.args(settings));
  if (!format.copiesAudio) args.push(...downmixArgs(format.stereoOnly, settings.downmixToStereo));

  const outputFilename = sanitizeFilename(outputName) + format.extension;
  return { ffmpegArgs: ['-i', inputFilename, ...args, outputFilename], outputFilename };
};