import { useCallback, useState } from 'react'
import { GetFileSize } from '../../../helpers/getFileSize'
import { Button } from '../Button'
import UploadButton from './UploadButton'

export interface IUploadBlob {
  name: string
  data: Blob
}

export type UploadData = File | IUploadBlob
export interface IProps {
  onUpload: (files: UploadData) => void
  accept?: string | undefined
  limit?: number
  isProcessing?: boolean
  label?: React.ReactNode
}

export function BtnUpload({
  onUpload,
  accept,
  limit,
  isProcessing = false,
  label = 'Upload',
}: IProps) {
  const [isLimitFileSize, setIsLimitFileSize] = useState<File | null>(null)

  const uploadHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('upload attachment', event.target.files)
      const files = event.target.files
      if (files) {
        const file = files.item(0)
        if (file) {
          const fileSize = GetFileSize(file)
          if (!limit || fileSize <= limit) {
            onUpload(file)
            setIsLimitFileSize(null)
          } else {
            setIsLimitFileSize(file)
          }
        }
      } else {
        setIsLimitFileSize(null)
      }
    },
    [onUpload, limit]
  )

  const onClose = () => {
    setIsLimitFileSize(null)
  }

  return (
    <UploadButton onUpload={uploadHandle} accept={accept} single={true} isProcessing={isProcessing}>
      <Button>{label}</Button>
    </UploadButton>
  )
}
