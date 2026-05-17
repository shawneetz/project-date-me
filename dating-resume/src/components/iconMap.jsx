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
