"use client";

import { Dialog } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";
import type { ShoppingListItem } from "@/entities/shopping-list/shopping-list-item";
import { ActiveShoppingListPanel } from "@/features/shopping-list/components/active-shopping-list-panel";

type MobileShoppingListSheetProps = {
  guestName: string;
  items: ShoppingListItem[];
  estimatedTotalCents: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearItems: () => void;
};

export function MobileShoppingListSheet({
  guestName,
  items,
  estimatedTotalCents,
  open,
  onOpenChange,
  onQuantityChange,
  onRemoveItem,
  onClearItems,
}: MobileShoppingListSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        className="fixed inset-x-5 bottom-5 z-40 inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-950/95 px-5 text-sm font-medium text-white shadow-lg shadow-black/40 backdrop-blur lg:hidden"
        aria-label="Abrir lista ativa"
      >
        Abrir lista ativa
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
        <Dialog.Popup
          aria-label="Lista ativa no celular"
          className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(20,24,35,1)_0%,_rgba(8,10,16,1)_100%)] p-4 outline-none lg:hidden"
        >
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/15" />
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-white">
              Lista ativa no celular
            </Dialog.Title>
            <Dialog.Close
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                />
              }
            >
              Fechar
            </Dialog.Close>
          </div>
          <ActiveShoppingListPanel
            compact
            guestName={guestName}
            items={items}
            estimatedTotalCents={estimatedTotalCents}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
            onClearItems={onClearItems}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
