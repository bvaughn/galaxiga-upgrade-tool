import { useMemo, useState } from "react";
import { CardPicker } from "../components/CardPicker";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { TextButton } from "../components/TextButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { formatNumber } from "../utils/number";
import { uid } from "../utils/uid";
import { CreateAction } from "./Actions/CreateAction";
import { UpgradeAction } from "./Actions/UpgradeAction";
import { Form } from "./Form";
import styles from "./Wizard.module.css";
import {
  Action,
  PendingAction,
  isCreateTier2Item,
  isCreateTier3Item,
  isUpgradeItem,
} from "./types";
import { calculateCreateCost } from "../utils/calculateCreateCost";
import { calculateUpgradeCost } from "../utils/calculateUpgradeCost";

export function Wizard() {
  const [droneCards, saveDroneCards] = useLocalStorage<number>(
    "generic-drone-cards",
    0
  );
  const [shipCards, saveShipCards] = useLocalStorage<number>(
    "generic-ship-cards",
    0
  );
  const [stoneCards, saveStoneCards] = useLocalStorage<number>(
    "generic-stone-cards",
    0
  );
  const [actions, saveActions] = useLocalStorage<Action[]>("wizard-items", []);

  const [defaultFormData, setFormData] = useState<{
    pendingAction: PendingAction;
    step: number;
  } | null>(null);

  const { coinsNeededTotal, gemsNeededTotal } = useMemo(() => {
    let coinsNeededTotal = 0;
    let gemsNeededTotal = 0;

    actions.forEach((action) => {
      if (isUpgradeItem(action)) {
        const cost = calculateUpgradeCost(
          0,
          action.itemStatsFrom,
          action.itemStatsTo,
          action.category,
          action.primaryItem.tier
        );

        gemsNeededTotal += cost.boxes.without.gemsNeededForLevels;
        coinsNeededTotal += cost.boxes.without.coinsNeededForLevels;
      } else {
        const cost = calculateCreateCost({
          genericCards: 0,
          category: action.category,
          itemStatsArray: action.secondaryItemStats,
          tier: action.type === "create-tier-2" ? 2 : 3,
        });

        gemsNeededTotal += cost.boxes.without.gemsNeededForLevels;
        coinsNeededTotal += cost.boxes.without.coinsNeededForLevels;
      }
    });

    return { coinsNeededTotal, gemsNeededTotal };
  }, [actions]);

  const addOrUpdateAction = (item: Action) => {
    setFormData(null);

    const index = actions.findIndex(({ id }) => id === item.id);
    if (index >= 0) {
      const newItems = [...actions];
      newItems.splice(index, 1, item);
      saveActions(newItems);
    } else {
      saveActions([...actions, item]);
    }
  };

  const deleteAction = (item: Action) => {
    saveActions(actions.filter(({ id }) => item.id !== id));
  };

  if (defaultFormData) {
    return (
      <Form
        defaultPendingAction={defaultFormData.pendingAction}
        defaultStep={defaultFormData.step}
        onDismiss={() => setFormData(null)}
        onSave={addOrUpdateAction}
      />
    );
  }

  return (
    <div className={styles.Page}>
      <div className={styles.BlockSection}>
        <CardPicker
          cards={shipCards}
          category="ship"
          onSave={saveShipCards}
          type="generic"
        />
        <CardPicker
          cards={droneCards}
          category="drone"
          onSave={saveDroneCards}
          type="generic"
        />
        <CardPicker
          cards={stoneCards}
          category="stone"
          onSave={saveStoneCards}
          type="generic"
        />
      </div>
      <div className={styles.MainSection}>
        <TextButton
          className={styles.StartUpgradeButton}
          onClick={() =>
            setFormData({
              pendingAction: {
                id: uid(),
              },
              step: 1,
            })
          }
        >
          Start an upgrade
        </TextButton>
        {actions.map((action) => {
          let genericCards;
          switch (action.category) {
            case "drone": {
              genericCards = droneCards;
              break;
            }
            case "ship": {
              genericCards = shipCards;
              break;
            }
            case "stone": {
              genericCards = stoneCards;
              break;
            }
          }

          if (isCreateTier2Item(action) || isCreateTier3Item(action)) {
            return (
              <CreateAction
                action={action}
                deleteAction={() => deleteAction(action)}
                editAction={() =>
                  setFormData({
                    pendingAction: action,
                    step: 4,
                  })
                }
                genericCards={genericCards}
                key={action.id}
              />
            );
          } else if (isUpgradeItem(action)) {
            return (
              <UpgradeAction
                action={action}
                deleteAction={() => deleteAction(action)}
                editAction={() =>
                  setFormData({
                    pendingAction: action,
                    step: 4,
                  })
                }
                genericCards={genericCards}
                key={action.id}
              />
            );
          } else {
            throw Error("Unsupported action");
          }
        })}
      </div>
      <div className={styles.BlockSection}>
        <div
          className={styles.Cost}
          data-disabled={gemsNeededTotal === 0 ? "" : undefined}
          title={`${formatNumber(gemsNeededTotal, "long")} gems`}
        >
          <Gem /> {formatNumber(gemsNeededTotal)}
        </div>
        <div
          className={styles.Cost}
          data-disabled={coinsNeededTotal === 0 ? "" : undefined}
          title={`${formatNumber(coinsNeededTotal, "long")} coins`}
        >
          <Coin /> {formatNumber(coinsNeededTotal)}
        </div>
      </div>
    </div>
  );
}
