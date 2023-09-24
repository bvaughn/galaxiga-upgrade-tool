import { Tier } from "../../types";
import { getItems } from "../../utils/items";
import {
  PendingWizardData,
  WizardData,
  WizardDataStep,
  isPendingCreateTier2Data,
  isPendingCreateTier3Data,
  isPendingUpgradeData,
} from "../types";
import { FormStep1 } from "./FormStep1";
import { FormStep2 } from "./FormStep2";
import { FormStep3CreateTier2 } from "./FormStep3CreateTier2";
import { FormStep3CreateTier3 } from "./FormStep3CreateTier3";
import { FormStep4Create } from "./FormStep4Create";
import { FormStep4Upgrade } from "./FormStep4Upgrade";
import { FormStep3Upgrade } from "./FormStep3Upgrade";

export function Form({
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
        <FormStep1
          cancel={cancel}
          goToNextStep={goToNextStep}
          pendingWizardData={pendingWizardData}
        />
      );
    case 2:
      return (
        <FormStep2
          cancel={cancel}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          pendingWizardData={pendingWizardData}
        />
      );
    case 3:
      if (isPendingCreateTier2Data(pendingWizardData)) {
        return (
          <FormStep3CreateTier2
            cancel={cancel}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            pendingWizardData={pendingWizardData}
          />
        );
      } else if (isPendingCreateTier3Data(pendingWizardData)) {
        return (
          <FormStep3CreateTier3
            cancel={cancel}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
          />
        );
      } else if (isPendingUpgradeData(pendingWizardData)) {
        return (
          <FormStep3Upgrade
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
          <FormStep4Create
            cancel={cancel}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
            save={save}
          />
        );
      } else if (isPendingUpgradeData(pendingWizardData)) {
        return (
          <FormStep4Upgrade
            cancel={cancel}
            goToPreviousStep={goToPreviousStep}
            pendingWizardData={pendingWizardData}
            save={save}
          />
        );
      }
  }
}
