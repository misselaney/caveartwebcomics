import React, { useState } from 'react'
import axios from 'axios'

function UploadComic() {

  const [files, setFiles] = useState<FileList>()
  const [src, setSrc] = useState<string>()
  const [error, setError] = useState<boolean>(false)

  const generatePreview = function(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target
    if (target.files !== null) {
      setFiles(target.files)
      setSrc(URL.createObjectURL(target.files[0]))
    }
  }

  const uploadFile = function () {
    const formData = new FormData()
    const input = document.querySelector('#comicpage') as HTMLInputElement
    if (input.files) {
      const upload = input.files[0]
      formData.append('file', upload)
      axios({
        method: 'post',
        url: '/api/comic/upload',
        data: formData
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          setError(true)
        })
    }

   
  }

  return (
    <div>
      <form>
        <input
          id="comicpage"
          type="file"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          onChange={(e) => generatePreview(e)}
          src={src}
        />
        <img className="upload__preview" id="upload_preview" src={src} alt="Preview" />
      </form>

      <label htmlFor="upload_date">Release date</label>
      <input type="date" id="upload_date" />

      <label htmlFor="upload_time">Time of day</label>
      <input type="time" id="upload_time" />

      <button type="button" onClick={() => {uploadFile()}}>Upload</button>
    </div>
  )
}

export default UploadComic;