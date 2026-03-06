import MidiVisual from '#/components/midi-visuals/MidiVisual'
import { MidiFileTrigger } from '#/components/ui/MidiFileTrigger'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="h-screen w-full p-16 overflow-auto flex justify-center bg-linear-to-b from-mist-700 to-mist-900">
      <MidiFileTrigger />
      <MidiVisual />
    </main>
  )
}
