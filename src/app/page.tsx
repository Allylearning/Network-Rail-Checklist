'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
  GitCommitHorizontal,
  Droplets,
  SprayCan,
  LifeBuoy,
  Scissors,
  KeyRound,
  ArrowBigUpDash,
  Spade,
  Hammer,
  Settings,
  Wrench,
  Check,
  RotateCcw,
  PartyPopper,
} from 'lucide-react';
import { BowSawIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const EQUIPMENT_ITEMS = [
  { id: 'rodding-set', name: 'Rodding Set', icon: GitCommitHorizontal },
  { id: 'drain-dye', name: 'Drain Tracing Dye', icon: Droplets },
  { id: 'spray-paint', name: 'Spray Paint', icon: SprayCan },
  { id: 'lifejacket', name: 'Lifejacket', icon: LifeBuoy },
  { id: 'slasher-tool', name: 'Slasher Tool', icon: Scissors },
  { id: 'manhole-keys', name: 'Manhole Keys', icon: KeyRound },
  { id: 'cover-lifter', name: 'Manhole Cover Lifter', icon: ArrowBigUpDash },
  { id: 'shovel', name: 'Shovel', icon: Spade },
  { id: 'bow-saw', name: 'Bow Saw', icon: BowSawIcon },
  { id: 'hammer', name: 'Mallet/Hammer', icon: Hammer },
  { id: 'screwdriver', name: 'Screwdriver', icon: Settings },
  { id: 'spanner', name: '13mm Spanner', icon: Wrench },
];

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const progress = useMemo(() => {
    if (EQUIPMENT_ITEMS.length === 0) return 0;
    return (checkedItems.size / EQUIPMENT_ITEMS.length) * 100;
  }, [checkedItems.size]);

  const handleCheckChange = (itemId: string, isChecked: boolean) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (isChecked) {
        newCheckedItems.add(itemId);
      } else {
        newCheckedItems.delete(itemId);
      }
      return newCheckedItems;
    });
  };

  const handleMarkAll = () => {
    setCheckedItems(new Set(EQUIPMENT_ITEMS.map((item) => item.id)));
  };

  const handleReset = () => {
    setCheckedItems(new Set());
  };

  const allItemsChecked = checkedItems.size === EQUIPMENT_ITEMS.length;

  return (
    <main className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/img/bg.jpg')] flex items-center justify-center p-4 sm:p-6 md:p-8 font-body">
      <Card className="w-full max-w-lg shadow-2xl bg-card">
        <CardHeader>
          <div className="relative h-48 w-full mb-4">
            <Image
              src="/img/tools.png"
              alt="An assortment of drainage tools."
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <CardTitle className="font-headline text-3xl font-bold text-center">
            Drainage Checklist
          </CardTitle>
          <CardDescription className="text-center">
            Ensure all equipment is packed before departure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
              <span>Packing Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-3" />
          </div>

          <Separator />

          {isClient && allItemsChecked ? (
            <div className="text-center py-8 space-y-4 flex flex-col items-center">
              <PartyPopper className="h-16 w-16 text-primary" />
              <p className="text-2xl font-bold text-primary">
                You're good to go!
              </p>
            </div>
          ) : (
            <div className="max-h-[40vh] overflow-y-auto pr-4 space-y-4">
              {EQUIPMENT_ITEMS.map((item) => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCheckChange(item.id, !isChecked)}
                    className="flex items-center gap-4 p-3 rounded-lg transition-colors bg-secondary/30 hover:bg-secondary cursor-pointer"
                  >
                    <item.icon
                      className={cn(
                        'h-7 w-7 shrink-0 transition-colors',
                        isChecked ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                    <Label
                      className={cn(
                        'flex-1 text-base font-medium transition-all pointer-events-none',
                        isChecked && 'text-muted-foreground line-through'
                      )}
                    >
                      {item.name}
                    </Label>
                    <Checkbox
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCheckChange(item.id, !!checked)
                      }
                      className="h-6 w-6 rounded-md"
                      aria-label={`Mark ${item.name} as packed`}
                      tabIndex={-1}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-6">
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={checkedItems.size === 0}
          >
            <RotateCcw /> Reset
          </Button>
          <Button onClick={handleMarkAll} disabled={allItemsChecked}>
            <Check /> Mark All
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
