import cableGuyData from "../data/cableGuyData.json";
import { getRandomItem } from "../utils/randomTestUtils";

// ✅ Get a random cable combo with brand
export function getRandomCableCombo() {
  const combo = getRandomItem(cableGuyData);
  const brand = getRandomItem(combo.brands);
  return {
    beginning: combo.beginning.name,
    end: combo.end.name,
    brand: brand.brand,
    comboName: combo.name,
  };
}
