import {
  isWizardDataCreateTier2,
  isWizardDataCreateTier3,
  isWizardDataUpgrade,
  PendingWizardData,
  WizardData,
  WizardDataStep,
} from "./types";

import { WizardDataCreate } from "./WizardDataCreate";
import { WizardDataUpgrade } from "./WizardDataUpgrade";

import { CardPicker } from "../components/CardPicker";
import { TextButton } from "../components/TextButton";
import { useCards } from "../hooks/useCards";
import { uid } from "../utils/uid";
import styles from "./shared.module.css";

export function WizardDataItems({
  setPendingWizardData,
  setWizardData,
  setPendingWizardStep,
  wizardData,
}: {
  setPendingWizardData: (value: PendingWizardData | null) => void;
  setWizardData: (value: WizardData[]) => void;
  setPendingWizardStep: (value: WizardDataStep) => void;
  wizardData: WizardData[];
}) {
  return (
    <>
      <div className={styles.CardRow}>
        <CardPicker category="ship" type="generic" />
        <CardPicker category="drone" type="generic" />
        <CardPicker category="stone" type="generic" />
      </div>
      <div className={styles.Column} data-center>
        <TextButton
          className={styles.StartUpgradeButton}
          onClick={() =>
            setPendingWizardData({
              id: uid(),
            })
          }
        >
          Start an upgrade
        </TextButton>
      </div>
      <div className={styles.Column}>
        {wizardData.map((data) => (
          <Data
            data={data}
            key={data.id}
            setPendingWizardData={setPendingWizardData}
            setWizardData={setWizardData}
            setPendingWizardStep={setPendingWizardStep}
            wizardData={wizardData}
          />
        ))}
      </div>
    </>
  );
}

function Data({
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
      <WizardDataCreate
        data={data}
        deleteItem={deleteItem}
        editItem={editItem}
        key={data.id}
      />
    );
  } else if (isWizardDataUpgrade(data)) {
    return (
      <WizardDataUpgrade
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
