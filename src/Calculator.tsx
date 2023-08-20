import styles from "./Calculator.module.css";
import { TIER_1_SHIPS, TIER_2_SHIPS } from "./data/ships";
import { TIER_1_SHIP_AND_STONE, MAX_LEVEL } from "./data/upgrade-costs";
import useLocalStorage from "./hooks/useLocalStorage";
import { Tier2Ship } from "./types";

type CalculatorShips = {
  [id: string]: ShipData;
};
type ShipData = {
  level: number;
  numCards: number;
};

const tier2Ships: [string, Tier2Ship][] = Array.from(
  Object.entries(TIER_2_SHIPS)
);

console.log(TIER_1_SHIP_AND_STONE);

// const numberFormatter = new Intl.NumberFormat();

export function Calculator() {
  //   const [calculatorShips = {}, setCalculatorShips] =
  //     useLocalStorage<CalculatorShips>("calculator-ships");

  //   const [idA, idB] = tier2Ships;

  //   return (
  //     <div className={styles.Calculator}>
  //       {tier2Ships.map(([id, ship]) => (
  //         <div className={styles.Row} key={id}>
  //           <Tier2ShipRenderer
  //             calculatorShips={calculatorShips}
  //             ship={ship}
  //             updateCalculatorShips={setCalculatorShips}
  //           />
  //           <TotalCost calculatorShips={calculatorShips} ship={ship} />
  //         </div>
  //       ))}
  //     </div>
  //   );
  return <div>TODO</div>;
}

// function TotalCost({
//   calculatorShips,
//   ship,
//   updateCalculatorShips,
// }: {
//   calculatorShips: CalculatorShips;
//   ship: Tier2Ship;
//   updateCalculatorShips: (calculatorShips: CalculatorShips) => void;
// }) {
//   const [idA, idB] = ship.createdByMerging;

//   const { level: levelA = 0, numCards: numCardsA = 0 } = calculatorShips[idA];
//   const { level: levelB = 0, numCards: numCardsB = 0 } = calculatorShips[idB];

//   const isComplete = levelA === MAX_LEVEL && levelB === MAX_LEVEL;
//   if (isComplete) {
//     return null;
//   }
//   const neededA = calcNeeded(levelA, numCardsA);
//   const neededB = calcNeeded(levelB, numCardsB);

//   const gemsNeededA = neededA.gemsToBuyBoxes + neededA.gemsToBuyLevels;
//   const gemsNeededB = neededB.gemsToBuyBoxes + neededB.gemsToBuyLevels;

//   const gemsNeededToMerge = 500;
//   const goldNeeded =
//     neededA.goldToBuyLevels -
//     neededA.goldFromBoxes +
//     neededB.goldToBuyLevels -
//     neededB.goldFromBoxes;

//   return (
//     <small>
//       💎 {numberFormatter.format(gemsNeededA + gemsNeededB + gemsNeededToMerge)}
//       <br />
//       <br />
//       🪙 {numberFormatter.format(goldNeeded)}
//     </small>
//   );
// }

// function Tier2ShipRenderer({
//   calculatorShips,
//   ship,
//   updateCalculatorShips,
// }: {
//   calculatorShips: CalculatorShips;
//   ship: Tier2Ship;
//   updateCalculatorShips: (calculatorShips: CalculatorShips) => void;
// }) {
//   const [idA, idB] = ship.createdByMerging;

//   const { level: levelA = 0, numCards: numCardsA = 0 } = calculatorShips[idA];
//   const { level: levelB = 0, numCards: numCardsB = 0 } = calculatorShips[idB];

//   const isComplete = levelA === MAX_LEVEL && levelB === MAX_LEVEL;

//   return (
//     <div className={styles.Grid}>
//       <div
//         className={styles.Tier2ShipName}
//         data-complete={isComplete || undefined}
//       >
//         {ship.name}
//       </div>
//       <div />
//       <div />
//       <div />
//       <div className={styles.GridColumn}>
//         {isComplete || (
//           <>
//             <label>💎</label>
//             <div>500</div>
//           </>
//         )}
//       </div>
//       <div />

//       {ship.createdByMerging.map((id) => (
//         <Tier1ShipRenderer
//           id={id}
//           key={id}
//           shipData={calculatorShips[id] ?? {}}
//           updateShipData={(shipData) => {
//             updateCalculatorShips({
//               ...calculatorShips,
//               [id]: shipData,
//             });
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// function Tier1ShipRenderer({
//   id,
//   shipData,
//   updateShipData,
// }: {
//   id: string;
//   shipData: ShipData;
//   updateShipData: (shipData: ShipData) => void;
// }) {
//   const ship = TIER_1_SHIPS[id];

//   const { level = 0, numCards = 0 } = shipData;

//   const {
//     cardsNeeded,
//     gemsToBuyLevels,
//     gemsToBuyBoxes,
//     goldFromBoxes,
//     goldToBuyLevels,
//   } = calcNeeded(level, numCards);

//   return (
//     <>
//       <div className={styles.GridColumn} colSpan={4}>
//         {ship.name}
//       </div>
//       <div className={styles.GridColumn}>
//         <label>Level:</label>
//         <input
//           min={0}
//           max={MAX_LEVEL}
//           onChange={({ target }) =>
//             updateShipData({
//               level: parseInt(target.value, 10),
//               numCards,
//             })
//           }
//           type="number"
//           value={level}
//         />
//       </div>
//       <div className={styles.GridColumn}>
//         <label>Cards:</label>
//         <input
//           min={0}
//           max={9999}
//           onChange={({ target }) =>
//             updateShipData({
//               level,
//               numCards: parseInt(target.value, 10),
//             })
//           }
//           type="number"
//           value={numCards}
//         />
//       </div>
//       <div className={styles.GridColumn} data-needed={cardsNeeded}>
//         {cardsNeeded > 0 && (
//           <div>
//             🃏 {numberFormatter.format(cardsNeeded)}
//             <br />
//             <small>({numberFormatter.format(gemsToBuyBoxes)} 💎)</small>
//           </div>
//         )}
//       </div>
//       <div className={styles.GridColumn} data-needed={gemsToBuyLevels}>
//         {gemsToBuyLevels > 0 && (
//           <>
//             <label>💎</label>
//             <div>{numberFormatter.format(gemsToBuyLevels)}</div>
//           </>
//         )}
//       </div>
//       <div className={styles.GridColumn} data-needed={gemsToBuyLevels}>
//         {goldToBuyLevels > 0 && (
//           <>
//             <label>🪙</label>
//             <div>
//               {numberFormatter.format(goldToBuyLevels)}
//               <br />
//               {goldFromBoxes > 0 && (
//                 <small>-{numberFormatter.format(goldFromBoxes)}</small>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// function calcNeeded(level: number, numCards: number) {
//   const cardsNeededTotal = cards
//     .slice(level)
//     .reduce((total, current) => total + current, 0);
//   const cardsNeeded = Math.max(0, cardsNeededTotal - numCards);

//   const gemsToBuyLevels = gems
//     .slice(level)
//     .reduce((total, current) => total + current, 0);

//   const boxesNeeded = Math.ceil(cardsNeeded / 60);
//   const gemsToBuyBoxes = boxesNeeded * 280;
//   const goldFromBoxes = boxesNeeded * 1500;

//   const goldToBuyLevels = gold
//     .slice(level)
//     .reduce((total, current) => total + current, 0);

//   return {
//     boxesNeeded,
//     cardsNeeded,
//     cardsNeededTotal,
//     gemsToBuyLevels,
//     gemsToBuyBoxes,
//     goldFromBoxes,
//     goldToBuyLevels,
//   };
// }
