import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { getItemStats } from "../hooks/useItemStats";
import { assert } from "../utils/assert";
import { PendingUpgradeData, WizardData, WizardDataUpgrade } from "./types";

import { IconButton } from "../components/IconButton";
import { useCards } from "../hooks/useCards";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./WizardStep.module.css";

export function WizardStep4Upgrade({
  cancel,
  goToPreviousStep,
  pendingWizardData,
  save,
}: {
  cancel: () => void;
  goToPreviousStep: () => void;
  pendingWizardData: PendingUpgradeData;
  save: (wizardData: WizardData) => void;
}) {
  const { id, primaryItem: item } = pendingWizardData;
  assert(item);

  const persistenceKeyFrom = `wizard-upgrade-from-${id}`;
  const persistenceKeyTo = `wizard-upgrade-to-${id}`;

  const [cards, setCards] = useCards("specific");
  const [genericCards, setGenericCards] = useCards("generic");

  return (
    <>
      <div className={styles.Prompt}>What level is {item.name} currently?</div>
      <ItemStatsSelector
        className={styles.Levels}
        hideCardsInput={true}
        item={item}
        persistenceKey={persistenceKeyFrom}
      />
      <div className={styles.Prompt}>What level would you like to reach?</div>
      <ItemStatsSelector
        className={styles.Levels}
        hideCardsInput={true}
        item={item}
        persistenceKey={persistenceKeyTo}
      />
      <div className={styles.Prompt}>How many cards do you have?</div>
      <div className={styles.CardsColumn}>
        <div className={styles.GenericCardsRow}>
          <label className={styles.CardInputLabel}>
            <div className={styles.LabelText}>{item.name} cards</div>
            <Card type="specific" category={item.category} />
            <NumberInput
              className={styles.CardInput}
              maxValue={9999}
              minValue={0}
              onChange={setCards}
              value={cards}
            />
          </label>
        </div>
        <div className={styles.GenericCardsRow}>
          <label className={styles.CardInputLabel}>
            <div className={styles.LabelText}>
              Generic {item.category} cards
            </div>
            <Card type="generic" category={item.category} />
            <NumberInput
              className={styles.CardInput}
              maxValue={9999}
              minValue={0}
              onChange={setGenericCards}
              value={genericCards}
            />
          </label>
        </div>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={cancel}>
          Cancel
        </button>
        <button
          className={styles.SaveButton}
          onClick={() => {
            save({
              ...pendingWizardData,
              genericCards,
              itemStatsFrom: {
                ...getItemStats(item, persistenceKeyFrom),
                cards,
              },
              itemStatsTo: getItemStats(item, persistenceKeyTo),
            } as WizardDataUpgrade);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
