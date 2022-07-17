import React, { useState } from 'react'

function UploadComic() {

  const [files, setFiles] = useState<FileList>()
  const [src, setSrc] = useState<string>()

  const generatePreview = function(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target
    if (target.files !== null) {
      setFiles(target.files)
      console.dir(target.files)
      setSrc(URL.createObjectURL(target.files[0]))
    }
  }

  const uploadFile = function () {
    const formData = new FormData()
  }

  return (
    <div>
      <form>
        <input
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