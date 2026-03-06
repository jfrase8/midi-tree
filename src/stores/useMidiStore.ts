import { Midi } from '@tonejs/midi'
import { create } from 'zustand'

interface MidiNote {
  midi: number
  time: number
  duration: number
  velocity: number
  name: string
}

interface MidiTrack {
  name: string
  instrument: string
  notes: MidiNote[]
}

interface MidiData {
  bpm: number
  duration: number
  tracks: MidiTrack[]
}

interface MidiStore {
  file: File | null
  midiData: MidiData | null
  isLoading: boolean
  error: string | null

  setFile: (file: File) => Promise<void>
  clearMidi: () => void
}

export const useMidiStore = create<MidiStore>((set) => ({
  file: null,
  midiData: null,
  isLoading: false,
  error: null,

  setFile: async (file: File) => {
    set({ isLoading: true, error: null, file })

    try {
      const arrayBuffer = await file.arrayBuffer()
      const midi = new Midi(arrayBuffer)

      const midiData: MidiData = {
        bpm: midi.header.tempos[0]?.bpm ?? 120,
        duration: midi.duration,
        tracks: midi.tracks.map((track) => ({
          name: track.name,
          instrument: track.instrument.name,
          notes: track.notes.map((note) => ({
            midi: note.midi,
            time: note.time,
            duration: note.duration,
            velocity: note.velocity,
            name: note.name,
          })),
        })),
      }

      set({ midiData, isLoading: false })
    } catch (e) {
      set({ error: 'Failed to parse MIDI file', isLoading: false })
    }
  },

  clearMidi: () => set({ file: null, midiData: null, error: null }),
}))
