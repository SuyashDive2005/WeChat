const WeChatLogo = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left W/Profile shape */}
      <g>
        {/* Left wave 1 */}
        <path
          d="M 20 25 Q 25 15 30 25 L 28 45 Q 27 50 22 50 Q 17 50 16 45 Z"
          fill="url(#gradient1)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left wave 2 */}
        <path
          d="M 32 25 Q 37 15 42 25 L 40 45 Q 39 50 34 50 Q 29 50 28 45 Z"
          fill="url(#gradient2)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Right W/Profile shape (mirrored) */}
      <g>
        {/* Right wave 1 */}
        <path
          d="M 70 25 Q 65 15 60 25 L 62 45 Q 63 50 68 50 Q 73 50 74 45 Z"
          fill="url(#gradient3)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right wave 2 */}
        <path
          d="M 58 25 Q 53 15 48 25 L 50 45 Q 51 50 56 50 Q 61 50 62 45 Z"
          fill="url(#gradient4)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Connection arc in the middle */}
      <path
        d="M 42 55 Q 50 65 58 55"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
        strokeLinecap="round"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient
          id="gradient1"
          x1="16"
          y1="15"
          x2="30"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00bcb4" />
          <stop offset="100%" stopColor="#0099aa" />
        </linearGradient>
        <linearGradient
          id="gradient2"
          x1="28"
          y1="15"
          x2="42"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00a8a0" />
          <stop offset="100%" stopColor="#008899" />
        </linearGradient>
        <linearGradient
          id="gradient3"
          x1="60"
          y1="15"
          x2="74"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00a8a0" />
          <stop offset="100%" stopColor="#008899" />
        </linearGradient>
        <linearGradient
          id="gradient4"
          x1="48"
          y1="15"
          x2="62"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00bcb4" />
          <stop offset="100%" stopColor="#0099aa" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WeChatLogo;
