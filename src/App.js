import { useEffect, useState } from 'react'
import './App.css'
import { gameLogic } from './gameLogic'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [gridSize, setGridSize] = useState(3)
  const [currentInput, setCurrentInput] = useState('')
  const [result, setResult] = useState('No Result')
  const [disable, setDisabled] = useState(false)
  const [resultArray, setResultArray] = useState(
    new Array(gridSize).fill(new Array(gridSize).fill(null))
  )

  const init = () => {
    setResultArray(new Array(gridSize).fill(new Array(gridSize).fill(null)))
    setCurrentInput('')
    setDisabled(false)
  }

  useEffect(() => {
    setResult(gameLogic(resultArray))
    if (!resultArray.some((row) => row.includes(null))) {
      setDisabled(true)
    }
  }, [resultArray])

  useEffect(() => {
    if (result.includes('win')) {
      setDisabled(true)
    }
  }, [result])

  const handleInout = (e) => {
    let cinput = e.target.value
    let target = e.target
    let tmp = target.id.split('-')
    let row = tmp[0]
    let col = tmp[1]
    if (
      (cinput === 'x' || cinput === 'o') &&
      target.value !== '' &&
      currentInput !== cinput
    ) {
      let arr = JSON.parse(JSON.stringify(resultArray))
      arr[row][col] = `${cinput}`
      setResultArray(arr)
      setCurrentInput(cinput)
      target.value = cinput
    } else {
      target.value = resultArray[row][col]
    }
  }

  const generateBox = (n) => {
    let boxes = []
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        boxes.push(
          <input
            key={`${i} input ${j}`}
            onKeyUp={handleInout}
            id={`${i}-${j}`}
            disabled={disable}
          />
        )
      }
      boxes.push(<br key={`${i} break`}></br>)
    }
    return boxes
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>
      <p style={{ margin: '4px' }}>Enter the number of rows and column</p>
      <h5 style={{ margin: 0 }}>Value should be greater than 3!</h5>
      <input
        style={{ margin: '16px', marginTop: '8px' }}
        onChange={(e) => {
          setDisabled(true)
          if (!isNaN(e.target.value) && e.target.value > 2) {
            setGridSize(parseInt(e.target.value, 10))
          } else {
            setGridSize(3)
          }
        }}
      />
      {disable ? (
        <h3>Press Reset To Play Again</h3>
      ) : (
        <div>{generateBox(gridSize)}</div>
      )}
      <h1>{result}</h1>
      <button
        onClick={() => {
          setDisabled(true)
          setTimeout(() => init(), 300)
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default App
