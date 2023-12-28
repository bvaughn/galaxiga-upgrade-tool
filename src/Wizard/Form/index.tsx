import { useState } from "react";
import { getItems } from "../../utils/items";
import {
  Action,
  PendingAction,
  isPendingCreateTier2Item,
  isPendingCreateTier3Item,
  isPendingCreateTier4Item,
  isPendingCreateTier5Item,
  isPendingUpgradeItem,
} from "../types";
import { FormStep1 } from "./FormStep1";
import { FormStep2 } from "./FormStep2";
import { FormStep3CreateTier2 } from "./FormStep3CreateTier2";
import { FormStep3CreateTier3 } from "./FormStep3CreateTier3";
import { FormStep3Upgrade } from "./FormStep3Upgrade";
import { FormStep4Create } from "./FormStep4Create";
import { FormStep4Upgrade } from "./FormStep4Upgrade";
import { Tier } from "../../types";
import { FormStep3CreateTier4 } from "./FormStep3CreateTier4";
import { FormStep3CreateTier5 } from "./FormStep3CreateTier5";

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
      } else if (isPendingCreateTier4Item(pendingAction)) {
        const items = getItems(pendingAction.category ?? "ship", 4);

        return (
          <FormStep3CreateTier4
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            onDismiss={onDismiss}
            pendingAction={pendingAction}
          />
        );
      } else if (isPendingCreateTier5Item(pendingAction)) {
        const items = getItems(pendingAction.category ?? "ship", 5);

        return (
          <FormStep3CreateTier5
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            items={items}
            onDismiss={onDismiss}
            pendingAction={pendingAction}
          />
        );
      } else if (isPendingUpgradeItem(pendingAction)) {
        let tier: Tier = 1;
        switch (pendingAction.type) {
          case "upgrade-tier-1": {
            tier = 1;
            break;
          }
          case "upgrade-tier-2": {
            tier = 2;
            break;
          }
          case "upgrade-tier-3": {
            tier = 3;
            break;
          }
          case "upgrade-tier-4": {
            tier = 4;
            break;
          }
          case "upgrade-tier-5": {
            tier = 5;
            break;
          }
        }
        const items = getItems(pendingAction.category ?? "ship", tier);

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
        isPendingCreateTier2Item(pendingAction) ||
        isPendingCreateTier3Item(pendingAction) ||
        isPendingCreateTier4Item(pendingAction) ||
        isPendingCreateTier5Item(pendingAction)
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
