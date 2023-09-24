import { CardPicker } from "../../components/CardPicker";
import { TextButton } from "../../components/TextButton";
import { uid } from "../../utils/uid";
import { PendingWizardData, WizardData, WizardDataStep } from "../types";
import { Item } from "./Item";
import styles from "./shared.module.css";

export function Items({
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
          <Item
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
