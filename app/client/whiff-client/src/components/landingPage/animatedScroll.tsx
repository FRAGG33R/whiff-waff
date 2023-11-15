import { motion } from "framer-motion";

export default function AnimatedScroll(props: { rotation: number }) {
  return (
    <motion.div
      style={{
        y: 40,
        opacity: Math.floor(Math.floor(props.rotation)) > 1 ? Math.abs(props.rotation / 4) : 0,
      }}
      className="absolute bottom-24 w-full h-12 md:flex items-center justify-center hidden flex-row  text-GreenishYellow "
    >
      <svg
        width="51"
        height="48"
        viewBox="0 0 51 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_903_608)">
          <path
            d="M15.1452 11.2096L24.9958 0.185649C25.2159 -0.0607284 25.601 -0.0620684 25.8229 0.182768L35.8182 11.2131C36.2176 11.6539 35.7397 12.3297 35.191 12.0999L25.6515 8.10418C25.4955 8.03882 25.3196 8.03927 25.1639 8.10541L15.7776 12.0924C15.2306 12.3247 14.7493 11.6528 15.1452 11.2096Z"
            fill="#CBFC01"
            stroke="#CBFC01"
            strokeWidth="0.0236742"
          />
          <motion.path
		  initial={{ y: -3 }}
		  animate={{ y: 3 }}
		  transition={{
			duration: 0.9,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut",
		  }}
            d="M32.983 23.6466C32.983 27.7891 29.6248 31.1465 25.483 31.1465C21.3412 31.1465 17.983 27.7891 17.983 23.6466C17.983 19.504 21.3412 16.1465 25.483 16.1465C29.6248 16.1465 32.983 19.504 32.983 23.6466Z"
            fill="#CBFC01"
            stroke="#CBFC01"
            strokeWidth="0.0236742"
          />
          <path
            
            d="M35.8208 36.0831L25.9702 47.1072C25.7501 47.3534 25.365 47.3548 25.1431 47.11L15.1478 36.0797C14.7484 35.6389 15.2263 34.963 15.775 35.1929L25.3145 39.1886C25.4705 39.254 25.6464 39.2535 25.8021 39.1875L35.1884 35.2005C35.7354 34.968 36.2167 35.6401 35.8208 36.0831Z"
            fill="#CBFC01"
            stroke="#CBFC01"
        	strokeWidth="0.0236742"
          />
        </g>
        <defs>
          <clipPath id="clip0_903_608">
            <rect width="50.966" height="47.2925" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="font-teko font-bold text-3xl pt-1 ">SCROLL</div>
    </motion.div>
  );
}
