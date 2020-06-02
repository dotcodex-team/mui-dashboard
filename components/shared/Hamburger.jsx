import { useState } from 'react'

const area = 32
const duration = 1
const timing = 'cubic-bezier(0, 0, 0, 1)'
const translate = 4.6325

const Burger = ({
  color = '#66788A',
  direction = 'left',
  hideOutline = true,
  onToggle,
  render,
  rounded = false,
  size = 22,
}) => {
  const [toggled, toggle] = useState(true)

  const width = Math.max(12, Math.min(area, size))
  const room = Math.round((area - width) / 2)

  const barHeightRaw = width / 12
  const barHeight = Math.round(barHeightRaw)
  const marginRaw = width / 4.5
  const margin = Math.round(marginRaw)

  const height = barHeight * 3 + margin * 2
  const topOffset = Math.round((area - height) / 2)

  const deviation = (barHeightRaw - barHeight) + (marginRaw - margin)
  const move = (width / translate) - (deviation / (4 / 3))

  const burgerStyles = {
    cursor: 'pointer',
    height: `${area}px`,
    position: 'relative',
    transition: `${duration}s ${timing}`,
    userSelect: 'none',
    width: `${area}px`,
  }

  const barStyles = {
    background: color,
    height: `${barHeight}px`,
    left: `${room}px`,
    position: 'absolute',
    width: `${width}px`,
  }

  if (hideOutline) {
    burgerStyles['outline'] = 'none'
  }

  if (rounded) {
    barStyles['borderRadius'] = '9em'
  }

  const handler = () => {
    if (onToggle) {
      onToggle(!toggled)
    }

    toggle(!toggled)
  }

  return render({
    barHeight,
    barStyles,
    burgerStyles,
    duration,
    handler,
    isLeft: (direction === 'left'),
    margin,
    move,
    timing,
    toggled,
    topOffset,
  })
}

export default (props) => (
    <Burger {...props} render={(o) => (
      <div
        className="hamburger-react"
        onClick={o.handler}
        onKeyUp={(e) => (e.key === 13 || e.keyCode === 13) && o.handler()}
        role="button"
        style={{
          ...o.burgerStyles,
          transform: `${o.toggled
            ? `rotate(${360 * (o.isLeft ? -1 : 1)}deg)`
            : 'none'
          }`,
        }}
        tabIndex="0"
      >
        <div style={{
          ...o.barStyles,
          top: `${o.topOffset}px`,
          transition: `${o.duration}s ${o.timing}`,
          transform: `${o.toggled
            ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)`
            : 'none'
          }`,
        }} />
  
        <div style={{
          ...o.barStyles,
          top: `${o.topOffset + o.barHeight + o.margin}px`,
          transition: `${o.duration}s ${o.timing}`,
          opacity: `${o.toggled
            ? '0'
            : '1'
          }`,
        }} />
  
        <div style={{
          ...o.barStyles,
          top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
          transition: `${o.duration}s ${o.timing}`,
          transform: `${o.toggled
            ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)`
            : 'none'
          }`,
        }} />
      </div>
    )} />
  )