import { useCards } from "../../hooks/useCards";
import {
  isWizardDataCreateTier2,
  isWizardDataCreateTier3,
  isWizardDataUpgrade,
  PendingWizardData,
  WizardData,
  WizardDataStep,
} from "../types";
import { ItemCreate } from "./ItemCreate";
import { ItemUpgrade } from "./ItemUpgrade";

export function Item({
  data,
  setPendingWizardData,
  setWizardData,
  setPendingWizardStep,
  wizardData,
}: {
  data: WizardData;
  setPendingWizardData: (value: PendingWizardData | null) => void;
  setWizardData: (value: WizardData[]) => void;
  setPendingWizardStep: (value: WizardDataStep) => void;
  wizardData: WizardData[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cards, setCards] = useCards(data.category, "specific");

  const deleteItem = () => {
    setWizardData(wizardData.filter(({ id }) => data.id !== id));
  };

  const editItem = () => {
    if (isWizardDataUpgrade(data)) {
      setCards(data.itemStatsFrom.cards);
    }

    setPendingWizardData(data);
    setPendingWizardStep(4);
  };

  if (isWizardDataCreateTier2(data) || isWizardDataCreateTier3(data)) {
    return (
      <ItemCreate
        data={data}
        deleteItem={deleteItem}
        editItem={editItem}
        key={data.id}
      />
    );
  } else if (isWizardDataUpgrade(data)) {
    return (
      <ItemUpgrade
        data={data}
        deleteItem={deleteItem}
        editItem={editItem}
        key={data.id}
      />
    );
  } else {
    throw Error("Unsupported data");
  }
}
