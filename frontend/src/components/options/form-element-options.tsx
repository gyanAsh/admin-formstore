import { Copy, EyeOff, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export const FromElementDialogContent = () => {
  const [stateDescription, setStateDescription] = useState({
    show: false,
    text: "",
  });
  const [statePlaceholder, setStatePlaceholder] = useState({
    show: false,
    text: "",
  });

  return (
    <DialogContent className="md:max-w-[700px]  rounded-4xl">
      <DialogHeader>
        <DialogTitle>Set Field Rules</DialogTitle>
        <DialogDescription>
          Define what users are allowed to enter in this field based on
          conditions.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col space-y-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="element-question">Question *</Label>
          <Input
            id="element-question"
            className="border-accent-foreground/40"
            placeholder="Your Question here."
          />
        </div>
        <div className="flex items-center flex-1 gap-4">
          <AnimatePresence>
            <motion.div
              hidden={!statePlaceholder.show}
              layout={true}
              key={"place"}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.1 }}
              className="grid flex-1 gap-2"
            >
              <Label htmlFor="element-placeholder">
                Placeholder{" "}
                <span className="text-muted-foreground text-xs">{`(Optional)`}</span>
              </Label>
              <Input
                id="element-placeholder"
                className="border-accent-foreground/40"
                placeholder="Add your placeholder text here."
              />
            </motion.div>

            <motion.div
              hidden={!stateDescription.show}
              key={"des"}
              layout={true}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.1 }}
              className="grid flex-1 gap-2"
            >
              <Label htmlFor="element-description">
                Description{" "}
                <span className="text-muted-foreground text-xs">{`(Optional)`}</span>
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="element-description"
                  className="border-accent-foreground/40"
                  placeholder="Your description here."
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center flex-1 gap-2">
          <Button
            className="w-fit border"
            variant="secondary"
            onClick={() => {
              setStatePlaceholder((e) => ({ ...e, show: !e.show }));
            }}
          >
            {statePlaceholder.show ? (
              <>
                <Trash /> Remove Placeholder
              </>
            ) : (
              <>
                <Plus /> Add Placeholder
              </>
            )}
          </Button>
          <Button
            className="w-fit border"
            variant="secondary"
            onClick={() => {
              setStateDescription((e) => ({ ...e, show: !e.show }));
            }}
          >
            {stateDescription.show ? (
              <>
                <Trash /> Remove Descriptions
              </>
            ) : (
              <>
                <Plus /> Add Descriptions
              </>
            )}
          </Button>
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="destructive">
            Close
          </Button>
        </DialogClose>
        <Button type="button" variant="default">
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
