import Plyr from 'react-plyr'
import React from 'react'
import 'react-plyr/src/plyr.css'

function VideoPlayer({ url, uniqueId }: { url: string; uniqueId?: string }) {
  return (
    <div>
      <Plyr
        className={uniqueId}
        type="video"
        sources={[
          {
            src: url,
            type: 'video/mp4',
          },
        ]}
      />
    </div>
  )
}

export default VideoPlayer
