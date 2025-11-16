export enum Faction {
  None = 0,
  Eagle = 1,
  Serpent = 2,
  Wolf = 3,
  Raven = 4
}

export function assignFaction(index: number) {
  const order = [Faction.Eagle, Faction.Serpent, Faction.Wolf, Faction.Raven];
  return order[index % order.length];
}
