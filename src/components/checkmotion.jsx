import { motion } from "framer-motion";

export default function CheckMotion() {

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
          const delay = i * 0.2;
          return {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay, type: "spring", duration: 0.5, bounce: 0 },
              opacity: { delay, duration: 0.01 }
            }
          };
        }
      };

    return (
        <motion.svg
            width="200"
            height="200"
            viewBox="0 0  200"
            initial="hidden"
            animate="visible"
        >
            <motion.circle
                cx="100"
                cy="100"
                r="90"
                stroke="#00cc88"
                variants={draw}
                custom={1}
                style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                    fill: "transparent"
                }}
            />
            <motion.line
                x1="60"
                y1="100"
                x2="90"
                y2="140"
                stroke="#00cc88"
                variants={draw}
                custom={2}
                style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                }}
            />
            <motion.line
                x1="90"
                y1="140"
                x2="130"
                y2="70"
                stroke="#00cc88"
                variants={draw}
                custom={3}
                style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                }}
            />
       </motion.svg>
    )
}