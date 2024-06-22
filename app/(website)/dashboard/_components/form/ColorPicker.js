"use client"
import React, {useEffect, useState} from "react"

const ColorPicker = ({onSelectColor, defaultValue}) => {
    const colors = ["#ff5733", "#ffc300", "#4caf50", "#009688", "#00bcd4", "#2196f3", "#673ab7", "#9c27b0", "#f44336", "#e91e63", "#ff9800", "#ffeb3b", "#8bc34a", "#4caf50", "#009688", "#00bcd6"]
    const [selectedColor, setSelectedColor] = useState(defaultValue)
    useEffect(() => {
        setSelectedColor(defaultValue)
    }, [defaultValue]);

    const handleColorClick = (color) => {
        setSelectedColor(color)
        onSelectColor(color)
    }
    return (
        <div className="flex justify-between mt-2">
            {colors.map((color, index) => (
                <div key={index} className="w-12 h-12 rounded-full mr-2 cursor-pointer" style={{backgroundColor: color ,
                    border: selectedColor === color ? "2px solid black" : "2px solid #fff"}}
                     onClick={() => handleColorClick(color)}></div>
            ))}
        </div>
    )
}
export default ColorPicker;
