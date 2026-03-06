import { useMidiStore } from '#/stores/useMidiStore'
import { useEffect } from 'react'
import * as Tone from 'tone'
import Text from '../ui/Text'

export default function MidiVisual() {
  const { midiData, isLoading, error } = useMidiStore()

  const playMidi = async () => {
    if (!midiData) return

    await Tone.start() // must be called from a user gesture
    const synth = new Tone.PolySynth(Tone.Synth).toDestination()

    midiData.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        synth.triggerAttackRelease(
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
