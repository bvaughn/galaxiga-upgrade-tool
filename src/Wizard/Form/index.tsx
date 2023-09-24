import { useState } from "react";
import { getItems } from "../../utils/items";
import {
  Action,
  PendingAction,
  isPendingCreateTier2Item,
  isPendingCreateTier3Item,
  isPendingUpgradeItem,
} from "../types";
import { FormStep1 } from "./FormStep1";
import { FormStep2 } from "./FormStep2";
import { FormStep3CreateTier2 } from "./FormStep3CreateTier2";
import { FormStep3CreateTier3 } from "./FormStep3CreateTier3";
import { FormStep3Upgrade } from "./FormStep3Upgrade";
import { FormStep4Create } from "./FormStep4Create";
import { FormStep4Upgrade } from "./FormStep4Upgrade";

export function Form({
  defaultPendingAction,
  defaultStep,
  onDismiss,
  onSave,
}: {
  defaultPendingAction: PendingAction;
  defaultStep: number;
  onDismiss: () => void;
  onSave: (formData: Action) => void;
}) {
  const [pendingAction, setPendingAction] =
    useState<PendingAction>(defaultPendingAction);
  const [step, setStep] = useState<number>(defaultStep);

  const goToNextStep = (action?: PendingAction) => {
    setStep(Math.min(4, step + 1));

    if (action) {
      setPendingAction(action);
    }
  };

  const goToPreviousStep = () => {
    setStep(Math.max(1, step - 1));
  };

  switch (step) {
    case 1:
      return (
        <FormStep1
          goToNextStep={goToNextStep}
          onDismiss={onDismiss}
          pendingAction={pendingAction}
        />
      );
    case 2:
      return (
        <FormStep2
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          onDismiss={onDismiss}
          pendingAction={pendingAction}
        />
      );
    case 3:
      if (isPendingCreateTier2Item(pendingAction)) {
        const items = getItems(pendingAction.category ?? "ship", 2);

        return (
          <FormStep3CreateTier2
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            onDismiss={onDismiss}
            pendingAction={pendingAction}
          />
        );
      } else if (isPendingCreateTier3Item(pendingAction)) {
        return (
          <FormStep3CreateTier3
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            onDismiss={onDismiss}
            pendingAction={pendingAction}
          />
        );
      } else if (isPendingUpgradeItem(pendingAction)) {
        const items = getItems(pendingAction.category ?? "ship", 3);

        return (
          <FormStep3Upgrade
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            onDismiss={onDismiss}
            pendingAction={pendingAction}
          />
        );
      } else {
        throw Error("Unsupported data");
      }
    case 4:
      if (
        isPendingCreateTier3Item(pendingAction) ||
        isPendingCreateTier2Item(pendingAction)
      ) {
        return (
          <FormStep4Create
            onDismiss={onDismiss}
            goToPreviousStep={goToPreviousStep}
            onSave={onSave}
            pendingAction={pendingAction}
          />
        );
      } else if (isPendingUpgradeItem(pendingAction)) {
        return (
          <FormStep4Upgrade
            onDismiss={onDismiss}
            goToPreviousStep={goToPreviousStep}
            onSave={onSave}
            pendingAction={pendingAction}
          />
        );
      }
  }
}
