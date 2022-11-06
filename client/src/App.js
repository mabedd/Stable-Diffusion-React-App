import { useState } from 'react'
import axios from 'axios'

function Loader() {
  return (
    <div className='flex flex-col items-center justify-center mt-4' role="status">
      <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 content-center" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    </div>
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
        <div className="flex-wrap mx-3 mb-6 grid place-items-center">
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
          <div className=''>
            {loading && <Loader />}
            {image ?
              <img
                src={`data:image/png;base64,${image}`}
                className='mt-4 rounded-lg shadow-xl object-center'
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
