'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { PropsWithChildren } from 'react';

type TooltipProps = PropsWithChildren<{
  label: string;
}>;

export function Tooltip({ children, label }: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0}>
        <RadixTooltip.Trigger asChild>
          <div>{children}</div>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="bg-white text-black px-2 py-1 rounded"
            sideOffset={5}
          >
            {label}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
