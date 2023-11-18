import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GrayVerticalLine = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 1}
    height={props.height}
    fill="none"
    {...props}
  >
    <Path stroke={props.color} strokeLinecap="round" d="M.5 1v50" />
  </Svg>
)
export default GrayVerticalLine
