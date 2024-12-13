import React from 'react';

const ChristmasAnimation = ({ isSuccess }) => {
  return (
    <div className="flex justify-center items-center w-full h-64">
      {isSuccess ? (
        // Happy bouncing present
        <div className="animate-bounce">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Present box */}
            <rect x="20" y="40" width="60" height="50" fill="#ff4444" />
            {/* Present lid */}
            <rect x="15" y="30" width="70" height="15" fill="#cc0000" />
            {/* Ribbon vertical */}
            <rect x="45" y="40" width="10" height="50" fill="#ffdd00" />
            {/* Ribbon horizontal */}
            <rect x="20" y="55" width="60" height="10" fill="#ffdd00" />
            {/* Happy face */}
            <path
              d="M40 55 Q50 65 60 55"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="35" cy="45" r="3" fill="#ffffff" />
            <circle cx="65" cy="45" r="3" fill="#ffffff" />
          </svg>
        </div>
      ) : (
        // Sad drooping present
        <div className="animate-pulse">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Present box */}
            <rect x="20" y="40" width="60" height="50" fill="#8b0000" />
            {/* Present lid */}
            <rect x="15" y="30" width="70" height="15" fill="#660000" />
            {/* Ribbon vertical */}
            <rect x="45" y="40" width="10" height="50" fill="#cc9900" />
            {/* Ribbon horizontal */}
            <rect x="20" y="55" width="60" height="10" fill="#cc9900" />
            {/* Sad face */}
            <path
              d="M40 65 Q50 55 60 65"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="35" cy="45" r="3" fill="#ffffff" />
            <circle cx="65" cy="45" r="3" fill="#ffffff" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChristmasAnimation;
