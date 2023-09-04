import { useCategory } from "../hooks/useCategory";
import { Category } from "../types";
import { Card } from "./Card";
import { RadioGroup, RadioOption } from "./RadioGroup";

import styles from "./CategoryTabs.module.css";

export function CategoryTabs() {
  const [category, setCategory] = useCategory();

  return (
    <div className={styles.Tabs}>
      <RadioGroup
        labelClassName={styles.Tab}
        name="category"
        onChange={setCategory}
        options={OPTIONS}
        value={category}
      />
    </div>
  );
}

const OPTIONS: RadioOption<Category>[] = [
  {
    label: (
      <>
        <Card type="generic" category="ship" />
        Ships
      </>
    ),
    value: "ship",
  },
  {
    label: (
      <>
        <Card type="generic" category="drone" />
        Drones
      </>
    ),
    value: "drone",
  },
  {
    label: (
      <>
        <Card type="generic" category="stone" />
        Stones
      </>
    ),
    value: "stone",
  },
];
