import { useMidiStore } from '#/stores/useMidiStore'
import { useEffect } from 'react'
import * as Tone from 'tone'
import Text from '../ui/Text'

export default function MidiVisual() {
  const { midiData, isLoading, error } = useMidiStore()

  const playMidi = async () => {
    if (!midiData) return

    await Tone.start() // must be called from a user gesture

    const sampler = new Tone.Sampler({
      urls: {
        A0: 'A0.mp3', C1: 'C1.mp3', 'D#1': 'Ds1.mp3', 'F#1': 'Fs1.mp3',
        A1: 'A1.mp3', C2: 'C2.mp3', 'D#2': 'Ds2.mp3', 'F#2': 'Fs2.mp3',
        A2: 'A2.mp3', C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3',
        A3: 'A3.mp3', C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3',
        A4: 'A4.mp3', C5: 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3',
        A5: 'A5.mp3', C6: 'C6.mp3', 'D#6': 'Ds6.mp3', 'F#6': 'Fs6.mp3',
        A6: 'A6.mp3', C7: 'C7.mp3', 'D#7': 'Ds7.mp3', 'F#7': 'Fs7.mp3',
        A7: 'A7.mp3', C8: 'C8.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      release: 1,
    }).toDestination()

    await Tone.loaded()

    midiData.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        sampler.triggerAttackRelease(
          note.name, // e.g. "C4"
          note.duration, // in seconds
          Tone.now() + note.time, // schedule time
          note.velocity, // 0-1
        )
      })
    })
  }
  useEffect(() => {
    playMidi()
  }, [midiData])

  if (error) return <Text>{error}</Text>
  if (isLoading) return <Text>Loading...</Text>
  if (!midiData) return null

  return (
    <div className="w-200 h-fit rounded-2xl bg-mist-500 flex flex-col p-4 items-center">
      <Text>Midi Data</Text>
      <Text>BMP: {midiData.bpm}</Text>
      <Text>Duration: {midiData.duration}</Text>
      <div className="flex justify-center gap-2">
        {midiData.tracks.map((track, i) => (
          <div key={i} className="bg-mist-900 size-fit p-2 rounded-2xl">
            <div className="flex flex-col gap-2 p-2 h-50 overflow-auto">
              <Text>Instrument: {track.instrument}</Text>
              {track.notes.map((note, j) => (
                <div key={`${note.name}-${j}`}>
                  <Text>{note.name}</Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
