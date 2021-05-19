import React, { useMemo } from 'react'

type Props = React.PropsWithChildren<{
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  disabled?: boolean
  single?: boolean
  isProcessing?: boolean
  classes?: {
    input: string
  }
}>

let idSeq = 0

const UploadButton = ({
  onUpload,
  children,
  accept = '*',
  disabled = false,
  single = false,
  isProcessing = false,
  classes = { input: '' },
}: Props) => {
  const inputId = useMemo(() => `contained-button-file-${idSeq++}`, [])

  return (
    <React.Fragment>
      {!isProcessing && (
        <input
          accept={accept}
          className={classes.input}
          id={inputId}
          multiple={!single}
          type="file"
          onChange={onUpload}
          disabled={disabled}
        />
      )}

      <label htmlFor={inputId}>{children}</label>
    </React.Fragment>
  )
}

export default UploadButton
