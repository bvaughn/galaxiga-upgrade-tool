import { useItems } from "../hooks/useItems";
import { PendingWizardData, WizardData, WizardDataStep } from "./types";

import { WizardStep1 } from "./WizardStep1";
import { WizardStep2 } from "./WizardStep2";
import { WizardStep3 } from "./WizardStep3";
import { WizardStep4Create } from "./WizardStep4Create";
import { WizardStep4Upgrade } from "./WizardStep4Upgrade";

export function WizardDataPrompt({
  pendingWizardData,
  pendingWizardStep,
  setPendingWizardData,
  setPendingWizardStep,
  setWizardData,
  wizardData,
}: {
  pendingWizardData: PendingWizardData;
  pendingWizardStep: number;
  setPendingWizardData: (value: PendingWizardData | null) => void;
  setPendingWizardStep: (value: WizardDataStep) => void;
  setWizardData: (value: WizardData[]) => void;
  wizardData: WizardData[];
}) {
  const items = useItems({
    category: pendingWizardData.category ?? "ship",
    showTier:
      pendingWizardData.action === "upgrade-tier-1" ? "tier-1" : "tier-2",
  });

  const cancel = () => {
    setPendingWizardData(null);
    setPendingWizardStep(1);
  };

  const goToNextStep = (value?: PendingWizardData) => {
    setPendingWizardStep(Math.min(4, pendingWizardStep + 1) as WizardDataStep);

    if (value) {
      setPendingWizardData(value);
    }
  };

  const goToPreviousStep = () => {
    setPendingWizardStep(Math.max(1, pendingWizardStep - 1) as WizardDataStep);
  };

  const save = (newWizardData: WizardData) => {
    setPendingWizardData(null);
    setPendingWizardStep(1);

    const index = wizardData.findIndex(({ id }) => id === newWizardData.id);
    if (index >= 0) {
      const newArray = [...wizardData];
      newArray.splice(index, 1, newWizardData);
      setWizardData(newArray);
    } else {
      setWizardData([...wizardData, newWizardData]);
    }
  };

  switch (pendingWizardStep) {
    case 1:
      return (
        <WizardStep1
          cancel={cancel}
          goToNextStep={goToNextStep}
          pendingWizardData={pendingWizardData}
        />
      );
    case 2:
      return (
        <WizardStep2
          cancel={cancel}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          pendingWizardData={pendingWizardData}
        />
      );
    case 3:
      return (
        <WizardStep3
          cancel={cancel}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          items={items}
          pendingWizardData={pendingWizardData}
        />
      );
    case 4:
      if (pendingWizardData.action === "create-tier-2") {
        return (
          <WizardStep4Create
            cancel={cancel}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
            save={save}
          />
        );
      } else {
        return (
          <WizardStep4Upgrade
            cancel={cancel}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
            save={save}
          />
        );
      }
  }
}
