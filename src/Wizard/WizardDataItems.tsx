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
  const [_, setGenericCards] = useCards("generic");
  const [__, setSpecificCards] = useCards("specific");

  return (
    <>
      <div className={styles.Column} data-center>
        <TextButton
          className={styles.LargeText}
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
        {wizardData.map((data) => {
          const deleteItem = () => {
            setWizardData(wizardData.filter(({ id }) => data.id !== id));
          };

          const editItem = () => {
            setGenericCards(data.genericCards);

            if (isWizardDataUpgrade(data)) {
              setSpecificCards(data.itemStatsFrom.cards);
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
        })}
      </div>
    </>
  );
}
