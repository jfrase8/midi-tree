import { useMidiStore } from '#/stores/useMidiStore'
import type { FileTriggerProps } from 'react-aria-components'
import { FileTrigger as RAFileTrigger } from 'react-aria-components'
import { Button } from './Button'

export function MidiFileTrigger(props: FileTriggerProps) {
  const { setFile } = useMidiStore()

  return (
    <div className="bg-mist-700 size-fit flex flex-col gap-2 rounded-2xl p-8">
      <RAFileTrigger
        {...props}
        acceptedFileTypes={['audio/midi', 'audio/x-midi', '.mid', '.midi']}
        onSelect={(e) => {
          if (!e || e.length > 1) return
          const file = e[0]
          setFile(file)
        }}
      >
        <Button>Select a file</Button>
      </RAFileTrigger>
      {/* {currentFile && (
        <div className="flex gap-2 items-center">
          <Text>{currentFile.name}</Text>
          <Button className="rounded-full p-2! size-fit!">
            <Play className="stroke-white size-6" />
          </Button>
        </div>
      )} */}
    </div>
  )
}
