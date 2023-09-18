import {
  PendingWizardData,
  WizardData,
  WizardDataStep,
  isPendingCreateTier2Data,
  isPendingCreateTier3Data,
  isPendingUpgradeData,
} from "./types";

import { Tier } from "../types";
import { getItems } from "../utils/items";
import { WizardStep1 } from "./WizardStep1";
import { WizardStep2 } from "./WizardStep2";
import { WizardStep3CreateTier2 } from "./WizardStep3CreateTier2";
import { WizardStep3CreateTier3 } from "./WizardStep3CreateTier3";
import { WizardStep4Create } from "./WizardStep4Create";
import { WizardStep4Upgrade } from "./WizardStep4Upgrade";
import { WizardStep3Upgrade } from "./Wizardstep3Upgrade";

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
  let tier: Tier;
  if (pendingWizardData.action === "upgrade-tier-1") {
    tier = 1;
  } else if (pendingWizardData.action === "upgrade-tier-2") {
    tier = 2;
  } else {
    tier = 3;
  }

  const items = getItems(pendingWizardData.category ?? "ship", tier);

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
      if (isPendingCreateTier2Data(pendingWizardData)) {
        return (
          <WizardStep3CreateTier2
            cancel={cancel}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            pendingWizardData={pendingWizardData}
          />
        );
      } else if (isPendingCreateTier3Data(pendingWizardData)) {
        return (
          <WizardStep3CreateTier3
            cancel={cancel}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
          />
        );
      } else if (isPendingUpgradeData(pendingWizardData)) {
        return (
          <WizardStep3Upgrade
            cancel={cancel}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            pendingWizardData={pendingWizardData}
          />
        );
      } else {
        throw Error("Unsupported data");
      }
    case 4:
      if (
        isPendingCreateTier3Data(pendingWizardData) ||
        isPendingCreateTier2Data(pendingWizardData)
      ) {
        return (
          <WizardStep4Create
            cancel={cancel}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
            save={save}
          />
        );
      } else if (isPendingUpgradeData(pendingWizardData)) {
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
