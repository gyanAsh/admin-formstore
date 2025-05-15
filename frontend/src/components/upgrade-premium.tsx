import { Button } from "./ui/button";
import * as motion from "motion/react-client";
export default function UpgradeFormstore() {
  return (
    <>
      <Button
        className="rounded-lg relative p-3 font-semibold"
        variant={"black"}
        asChild
      >
        <motion.div
          whileHover={{
            scale: 1.04,
            transition: {
              duration: 0.09,
              type: "spring",
              ease: "easeInOut",
            },
            // backgroundColor: "#e7f955",
            border: "1px",
            // color: "#555",
          }}
          whileTap={{ scale: 0.89 }}
        >
          Upgrade
        </motion.div>
      </Button>
    </>
  );
}
