import { atom } from "nanostores";

export const $counter = atom<number>(0);

export const increaseCount = () => {
  $counter.set($counter.get() + 1);
};
export const decreaseCount = () => {
  $counter.set($counter.get() - 1);
};
