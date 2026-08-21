const CardFanIcon = props => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g className="card-fan__card card-fan__card--left">
        <rect
          className="card-fan__face"
          x="8"
          y="9"
          width="19"
          height="27"
          rx="3"
        />
      </g>
      <g className="card-fan__card card-fan__card--right">
        <rect
          className="card-fan__face"
          x="13"
          y="9"
          width="19"
          height="27"
          rx="3"
        />
      </g>
      <g className="card-fan__card card-fan__card--center">
        <rect
          className="card-fan__face"
          x="10.5"
          y="5"
          width="19"
          height="30"
          rx="3"
        />
        <path
          className="card-fan__pip"
          d="M20 13.5 23.5 17 20 20.5 16.5 17 20 13.5Z"
        />
      </g>
    </svg>
  )
}

export default CardFanIcon
