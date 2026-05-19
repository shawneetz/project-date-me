/**
 * Icon Map
 * Purpose: Map icon keys (strings) to SVG icon components - factory function pattern
 *
 * Pipeline:
 * Import all Icon components from './Icons'
 *   -> Create icons lookup object { key: IconComponent }
 *   -> getIcon(key) -> find component in lookup -> return <Icon /> or null
 */
import {
  ShootingStar,
  Radio,
  Compass,
  Bookshelf,
  CRTTV,
  Wrench,
  FloppyDisk,
  Bicycle,
  Kettle,
} from "./Icons";

const icons = {
  shootingStar: ShootingStar,
  radio: Radio,
  compass: Compass,
  bookshelf: Bookshelf,
  crtTv: CRTTV,
  wrench: Wrench,
  floppyDisk: FloppyDisk,
  bicycle: Bicycle,
  kettle: Kettle,
};

export function getIcon(key) {
  const Icon = icons[key];
  return Icon ? <Icon /> : null;
}
