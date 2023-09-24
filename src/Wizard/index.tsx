import { useState } from "react";
import { CardPicker } from "../components/CardPicker";
import { TextButton } from "../components/TextButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { uid } from "../utils/uid";
import { CreateAction } from "./Actions/CreateAction";
import { UpgradeAction } from "./Actions/UpgradeAction";
import styles from "./Actions/shared.module.css";
import { Form } from "./Form";
import {
  Action,
  PendingAction,
  isCreateTier2Item,
  isCreateTier3Item,
  isUpgradeItem,
} from "./types";

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
    <>
      <div className={styles.CardRow}>
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
      <div className={styles.Column} data-center>
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
      </div>
      <div className={styles.Column}>
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
    </>
  );
}
