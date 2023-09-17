import {
  isWizardDataCreate,
  PendingWizardData,
  WizardData,
  WizardDataStep,
} from "./types";

import { WizardDataCreate } from "./WizardDataCreate";
import { WizardDataUpgrade } from "./WizardDataUpgrade";

import styles from "./shared.module.css";
import { uid } from "../utils/uid";

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
      <div className={styles.Column} data-center>
        <div
          className={styles.LargeText}
          onClick={() =>
            setPendingWizardData({
              id: uid(),
            })
          }
        >
          Start an upgrade
        </div>
      </div>
      <div className={styles.Column}>
        {wizardData.map((data) => {
          const deleteItem = () => {
            setWizardData(wizardData.filter(({ id }) => data.id !== id));
          };

          const editItem = () => {
            setPendingWizardData(data);
            setPendingWizardStep(4);
          };

          if (isWizardDataCreate(data)) {
            return (
              <WizardDataCreate
                data={data}
                deleteItem={deleteItem}
                editItem={editItem}
                key={data.id}
              />
            );
          } else {
            return (
              <WizardDataUpgrade
                data={data}
                deleteItem={deleteItem}
                editItem={editItem}
                key={data.id}
              />
            );
          }
        })}
      </div>
    </>
  );
}
