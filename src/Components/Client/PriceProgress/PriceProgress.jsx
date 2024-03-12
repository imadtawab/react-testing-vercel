import { useRef, useState } from 'react'
import './PriceProgress.scss'

export default function PriceProgress({step , cielValue , min_input , setMin_input , max_input=cielValue , setMax_input}) {
// const progressTruck = document.querySelector(".progress-truck")
// const minVal = document.getElementById("minVal")
// const maxVal = document.getElementById("maxVal")
// const minRange = document.getElementById("minRange")
// const maxRange = document.getElementById("maxRange")
// const cielValue = 5000
{/* <PriceProgress step={500} maxValue={10000}/> */}
// const step = 100
const halfCircle = 16
// maxVal.value = cielValue
// const cielValue = 5000
const [min_percent , setMin_percent] = useState(0)
const [max_percent , setMax_percent] = useState(100)
// const [min_input , setMin_input] = useState(0)
// const [max_input , setMax_input] = useState(cielValue)
const minRangeHandle = (e) => {
    if (percentToValue(e.target.value) + step <= percentToValue(max_percent)) {
        setMin_percent(e.target.value)
        setMin_input(percentToValue(e.target.value))
    };
}
const maxRangeHandle = (e) => {
    if (percentToValue(e.target.value) - step >= percentToValue(min_percent)) {
        setMax_percent(e.target.value);
        setMax_input(percentToValue(e.target.value))
    } 
}
const minValHandle = (e) => {
    const currentValue = e.target.value;
    if(currentValue < 0) {
        setMin_percent(valueToPercent(0))
        setMin_input(0)
        return
    }
    if(+currentValue + +step > percentToValue(max_percent)) {
        setMin_percent(valueToPercent(percentToValue(max_percent) - +step))
        setMin_input(percentToValue(max_percent) - +step)
        return
    }
    setMin_percent(valueToPercent(currentValue))
    setMin_input(currentValue)
}
const maxValHandle = (e) => {
    const currentValue = e.target.value;
    if(currentValue > cielValue) {
        setMax_percent(valueToPercent(cielValue))
        setMax_input(cielValue)
        return
    }
    if(+currentValue - +step < percentToValue(min_percent)) {
        setMax_percent(valueToPercent(percentToValue(min_percent) + +step))
        setMax_input(currentValue)
        return
    }
    setMax_percent(valueToPercent(currentValue))
    setMax_input(currentValue)
}
const percentToValue = (percent) => {
    return percent * cielValue / 100
}
const valueToPercent = (value) => {
    return value / cielValue * 100
}
  return (
    <div className="PriceProgress">
    <div className="inputs-progress">
        <div className="min">
            <label htmlFor="minVal">Min</label>
            <input onChange={minValHandle} value={min_input} type="number" name="min" id="minVal"/>
        </div>
        <div className="seperator"></div>
        <div className="max">
            <label htmlFor="maxVal">Max</label>
            <input onChange={maxValHandle} value={max_input} type="number" name="max" id="maxVal"/>
        </div>
    </div>
    <div className="progress-bar">
        <div style={{
            left: `calc(${min_percent}% - ${min_percent * halfCircle / 100}px)`,
            right: `calc(${100 - max_percent}% - ${(100 - max_percent) * halfCircle / 100}px)`,
            }} className="progress-truck"></div>
        <input onInput={minRangeHandle} step={100 / cielValue * step} min="0" max="100" value={min_percent} type="range" name="min-range" id="minRange"/>
        <input onInput={maxRangeHandle} step={100 / cielValue * step} min="0" max="100"  value={max_percent} type="range" name="max-range" id="maxRange"/>
    </div>
    <div className="progress-footer">
        <div className="result">Price : <span>{percentToValue(min_percent).toFixed(0)} Dh</span> — <span>{percentToValue(max_percent).toFixed(0)} Dh</span></div>
        <div className="filter-btn">filter</div>
    </div>
</div>
  )
}
