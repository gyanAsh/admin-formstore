import { Button } from "./ui/button";
import * as motion from "motion/react-client";
export default function UpgradeFormstore() {
  return (
    <>
      <Button className="rounded-lg p-3 font-semibold text-white" asChild>
        <motion.div
          whileHover={{
            scale: 1.04,
            transition: { duration: 0.05, type: "spring" },
          }}
          whileTap={{ scale: 0.8 }}
        >
          Upgrade
        </motion.div>
      </Button>
    </>
  );
}
