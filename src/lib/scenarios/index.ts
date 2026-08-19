import { moneyScenarios } from "./money";
import { scamScenarios } from "./scams";
import { workScenarios } from "./work";
import { businessScenarios } from "./business";
import { negotiationScenarios } from "./negotiation";
import { digitalScenarios } from "./digital";
import { everydayScenarios } from "./everyday";
import { Scenario } from "@/types/game";

export const allScenarios: Scenario[] = [
  ...moneyScenarios,
  ...scamScenarios,
  ...workScenarios,
  ...businessScenarios,
  ...negotiationScenarios,
  ...digitalScenarios,
  ...everydayScenarios,
];
