/**
 * Output format: MP3 audio extracted from video containers (local files only).
 */
import React from 'react';
import SelectField from './components/SelectField';
import LabeledSlider from './components/LabeledSlider';

export type Codec = 'MP3';

export interface FormatSettings {
  downmixToStereo: boolean;
  mp3Bitrate: string;
  mp3EncodingType: string;
  mp3VbrSetting: string;
  /** Unused (audio-only site); kept for createFFmpegArgs compatibility */
  isKeepVideo: boolean;
  outputType: 'audio';
  videoAudio: 'none';
}

export const DEFAULT_SETTINGS: FormatSettings = {
  downmixToStereo: false,
  mp3Bitrate: '192',
  mp3EncodingType: 'cbr',
  mp3VbrSetting: '4',
  isKeepVideo: false,
  outputType: 'audio',
  videoAudio: 'none',
};

export type SetSetting = <K extends keyof FormatSettings>(key: K, value: FormatSettings[K]) => void;

const BitrateSlider = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <LabeledSlider
    id="mp3_bitrate"
    label="Bitrate"
    min={64}
    max={320}
    step={32}
    value={value}
    unit="kbps"
    onChange={onChange}
  />
);

export const FORMATS = {
  MP3: {
    label: 'MP3 (.mp3)',
    extension: '.mp3',
    keepVideo: false,
    copiesAudio: false,
    stereoOnly: false,
    allAudioTracks: false,
    args: (s: FormatSettings) => {
      if (s.mp3EncodingType === 'vbr') return ['-c:a', 'libmp3lame', '-q:a', s.mp3VbrSetting];
      if (s.mp3EncodingType === 'abr') {
        return ['-c:a', 'libmp3lame', '-abr', '1', '-b:a', `${s.mp3Bitrate}k`];
      }
      return ['-c:a', 'libmp3lame', '-b:a', `${s.mp3Bitrate}k`];
    },
    settings: (settings: FormatSettings, set: SetSetting) => (
      <>
        <SelectField
          id="mp3_encoding_type"
          label="Encoding type"
          value={settings.mp3EncodingType}
          onChange={v => set('mp3EncodingType', v)}
          options={[
            ['cbr', 'CBR (constant bitrate)'],
            ['vbr', 'VBR (variable bitrate)'],
            ['abr', 'ABR (average bitrate)'],
          ]}
        />
        {settings.mp3EncodingType === 'vbr' ? (
          <SelectField
            id="mp3_vbr_setting"
            label="VBR quality (0 = best)"
            value={settings.mp3VbrSetting}
            onChange={v => set('mp3VbrSetting', v)}
            options={['0', '2', '4', '6', '8'].map(v => [v, v] as const)}
          />
        ) : (
          <BitrateSlider value={settings.mp3Bitrate} onChange={v => set('mp3Bitrate', v)} />
        )}
      </>
    ),
  },
} as const;