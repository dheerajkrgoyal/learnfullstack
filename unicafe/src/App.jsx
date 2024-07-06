import { useState } from "react"

const Statistics = ({good, neutral, bad, total}) => {
  if(total === 0){
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
      
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total Feedback: {total}</p>
      <p>Average Score: {(good-bad)/total}</p>
      <p>Positive Feedback: {(good*100)/total}</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const clickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const clickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const clickBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={clickGood} text='Good'/>
      <Button handleClick={clickNeutral} text='Neutral'/>
      <Button handleClick={clickBad} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App
