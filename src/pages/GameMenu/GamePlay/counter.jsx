import { motion ,animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Counter({ to, winner }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    count.set(0);
    const controls = animate(count, to, { duration: 3 });

    return () => controls.stop();
  }, [to]);

  return (
    <div className="text-white  drop-shadow-lg m-auto flex items-center justify-center">
      <motion.div className="text-2xl md:text-4xl lg:text-6xl">{rounded}</motion.div>
      {winner && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3}} className="text-xl md:text-2xl lg:text-4xl"> 🎉</motion.div>)}
    </div>
  )
}