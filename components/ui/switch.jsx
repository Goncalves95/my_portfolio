"use client"

import * as React from "react"

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false)
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    setIsChecked(checked || false)
  }, [checked])

  const handleChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onCheckedChange?.(newValue)
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
          isChecked 
            ? 'bg-accent border-accent' 
            : 'bg-[#1c1c22] border-gray-600 hover:border-gray-500'
        } ${!isChecked && 'border-2 border-dashed border-gray-500'} ${className}`}
        onClick={handleChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
        {...props}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
          {isChecked ? 'Desativar' : 'Ativar'}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  )
})
Switch.displayName = "Switch"

export { Switch }
