import { useState } from 'react'
import axios from 'axios'

function Loader() {
  return (
    <svg class="animate-spin w-64" viewBox="0 0 24 24">
    </svg>
  )
}

function App() {

  // Initial state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)

  // Prediction
  const predict = async () => {
    try {
      // Send request
      setLoading(true)
      const res = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`)
      setLoading(false)

      // Updata image
      setImage(res.data)
    } catch (error) {
      // Throw error
      setError(error)
    }
  }

  return (
    <div className='bg-slate-800'>
      <div className="max-w-screen-md mx-auto p-5 ">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-600 mt-8">
            Stable Diffusion <span className="text-indigo-600">App</span>
          </h3>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="3"
              className="appearance-none block w-full text-gray-700 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none">
            </textarea>
          </div>
          <div className="flex justify-center w-full px-3">
            <button
              onClick={predict}
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
              Generate Image
            </button>
          </div>
          <div>
            {loading && <Loader />}
            {image ?
              <img
                src={`data:image/png;base64,${image}`}
              />
              : null}
            {error && <p className='text-red'>{error.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
