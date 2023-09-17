import useLocalStorage from "../hooks/useLocalStorage";
import { uid } from "../utils/uid";
import { PendingWizardData, WizardData, WizardDataStep } from "./types";

import { WizardDataItems } from "./WizardDataItems";
import { WizardDataPrompt } from "./WizardDataPrompt";

export default function Wizard() {
  const [wizardData, setWizardData] = useLocalStorage<WizardData[]>(
    "wizard-data",
    []
  );

  const [pendingWizardData, setPendingWizardData] =
    useLocalStorage<PendingWizardData | null>(
      "wizard-data-pending",
      wizardData.length === 0
        ? {
            id: uid(),
          }
        : null
    );
  const [pendingWizardStep, setPendingWizardStep] =
    useLocalStorage<WizardDataStep>("wizard-data-pending-step", 1);

  return (
    <>
      {pendingWizardData ? (
        <WizardDataPrompt
          pendingWizardData={pendingWizardData}
          pendingWizardStep={pendingWizardStep}
          setPendingWizardData={setPendingWizardData}
          setPendingWizardStep={setPendingWizardStep}
          setWizardData={setWizardData}
          wizardData={wizardData}
        />
      ) : (
        <WizardDataItems
          setPendingWizardData={setPendingWizardData}
          setWizardData={setWizardData}
          setPendingWizardStep={setPendingWizardStep}
          wizardData={wizardData}
        />
      )}
    </>
  );
}
