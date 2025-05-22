export default function ApplicationLogo(props) {
    return (
        <svg
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="150"
                cy="150"
                r="140"
                stroke="#123D64"
                stroke-width="10"
                fill="white"
            />

            <circle
                cx="150"
                cy="150"
                r="100"
                stroke="#123D64"
                stroke-width="4"
                fill="#ffffff"
            />

            <g fill="#3B82F6">
                <circle cx="150" cy="130" r="20" />
                <rect x="130" y="150" width="40" height="50" rx="10" />

                <circle cx="110" cy="135" r="15" />
                <rect x="95" y="150" width="30" height="40" rx="8" />

                <circle cx="190" cy="135" r="15" />
                <rect x="175" y="150" width="30" height="40" rx="8" />
            </g>

            <circle cx="220" cy="190" r="25" fill="#123D64" />
            <polyline
                points="210,190 218,198 235,180"
                fill="none"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <text
                x="150"
                y="60"
                font-size="18"
                font-family="Arial, sans-serif"
                text-anchor="middle"
                fill="#123D64"
                font-weight="bold"
            >
                SUPPORT TEAM
            </text>
            <text
                x="150"
                y="265"
                font-size="18"
                font-family="Arial, sans-serif"
                text-anchor="middle"
                fill="#123D64"
                font-weight="bold"
            >
                TRACKER
            </text>
        </svg>
    );
}
