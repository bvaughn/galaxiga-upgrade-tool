import { Card } from "../../components/Card";
import { IconButton } from "../../components/IconButton";
import { NumberInput } from "../../components/NumberInput";
import { useCards } from "../../hooks/useCards";
import { getItemStats } from "../../hooks/useItemStats";
import { assert } from "../../utils/assert";
import { PendingUpgradeData, WizardData, WizardDataUpgrade } from "../types";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./shared.module.css";

export function FormStep4Upgrade({
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

  const [cards, setCards] = useCards(item.category, "specific");

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
        <div className={styles.CardsRow}>
          <label className={styles.CardInputLabel}>
            <div className={styles.LabelText}>{item.name} cards</div>
            <Card type="specific" category={item.category} />
            <NumberInput
              className={styles.CardInput}
              maxValue={99999}
              minValue={0}
              onChange={setCards}
              value={cards}
            />
          </label>
        </div>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button
          className={styles.CancelButton}
          onClick={async () => {
            setCards(0);

            await Promise.resolve();

            cancel();
          }}
        >
          Cancel
        </button>
        <button
          className={styles.SaveButton}
          onClick={async () => {
            setCards(0);

            await Promise.resolve();

            save({
              ...pendingWizardData,
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
