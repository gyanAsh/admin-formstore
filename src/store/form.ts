import { FormElementTypes } from "@/lib/utils";
import { atom, batched, computed } from "nanostores";

interface Card {
  id: number;
  elementType: FormElementTypes | null;
  element: object;
}

const defaultCardObject = { id: 1, elementType: null, element: {} };

export const $cardsStore = atom<Card[]>([defaultCardObject]);
export const $currentCard = atom<Card>(defaultCardObject);

//Functions
export const createNewCard = () => {
  const currentCards = $cardsStore.get();
  const newCard = {
    id: currentCards.length + 1,
    elementType: null,
    element: {},
  };
  $cardsStore.set([...currentCards, newCard]);
  $currentCard.set(newCard);
};
export function updateElementType(cardId: number, newElementType: any) {
  $cardsStore.set(
    $cardsStore
      .get()
      .map((card) =>
        card.id === cardId ? { ...card, elementType: newElementType } : card
      )
  );

  if ($currentCard.get().id === cardId) {
    $currentCard.set({ ...$currentCard.get(), elementType: newElementType });
  }
}

export const selectCard = (cardId: number) => {
  const cards = $cardsStore.get();
  const selectedCard =
    cards.find((card) => card.id === cardId) || defaultCardObject;
  $currentCard.set(selectedCard);
};
