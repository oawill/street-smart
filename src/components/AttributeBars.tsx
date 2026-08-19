"use client";

import { motion } from "framer-motion";
import { ATTRIBUTES, ATTRIBUTE_LABELS, Attribute } from "@/types/game";

export function AttributeBars({ attributes }: { attributes: Record<Attribute, number> }) {
  return (
    <div className="flex flex-col gap-3">
      {ATTRIBUTES.map((attr) => {
        const value = Math.round(attributes[attr]);
        return (
          <div key={attr}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{ATTRIBUTE_LABELS[attr]}</span>
              <span className="font-display text-sm font-bold text-brand-strong">{value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
