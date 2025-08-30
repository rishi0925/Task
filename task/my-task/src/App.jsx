import { useState } from 'react'
import './App.css'

const STATUS = {
  IDEAL: 'ideal',
  RUNNING: 'running',
}
function App() {
  const [inputValue, setInputValue] = useState(1)
  const [progressWidth, setProgressWidth] = useState(0)
  const [status, setStatus] = useState(STATUS.IDEAL)

  const calculatePercentage = async (width) => {
    console.log("Invoke");

    if (width >= 100) {
      console.log("Less Than 100", width);
      return
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    width += 100 / inputValue
    setProgressWidth(width)
    console.log("Calculation ", width);
    return calculatePercentage(width)

  }


  function handleStart() {
    setStatus(STATUS.RUNNING)
    setProgressWidth(0)
    calculatePercentage(0)
    setTimeout(() => {
      setProgressWidth(100)
      setStatus(STATUS.IDEAL)
    }, inputValue * 1000)
  }

  return (
    <div>
      <div className='form-container'>
        <input id='seconds' className='input' type="number" value={inputValue} min={1} onChange={(e) => setInputValue(e?.target?.value)} />
        <button onClick={handleStart} disabled={status === STATUS.RUNNING}>Start</button>
      </div>

      <div className='progress-container'>
        <div style={{ width: `${progressWidth}%` }} className='progress-bar'>
        </div>
        <div className='percentage'>{progressWidth}%</div>
      </div>
    </div>
  )
}

export default App
