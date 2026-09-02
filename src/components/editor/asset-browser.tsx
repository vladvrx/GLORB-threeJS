"use client";

import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NativeSelect } from "@/components/editor/fields";
import { activeViewport } from "@/lib/runtime/viewport-engine";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "nature", "buildings", "beach", "water", "vehicles", "terrain", "props", "characters", "other"];

export function AssetBrowser() {
  const catalog = useEditor((state) => state.catalog);
  const assetFilter = useEditor((state) => state.assetFilter);
  const setAssetFilter = useEditor((state) => state.setAssetFilter);
  const addAsset = useEditor((state) => state.addAsset);
  const search = useEditor((state) => state.search);

  const assets = useMemo(() => {
    return catalog.filter((asset) => {
      if (assetFilter !== "all" && asset.category !== assetFilter) return false;
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return asset.name.toLowerCase().includes(query);
    });
  }, [catalog, assetFilter, search]);

  return (
    <div className="flex h-full min-h-0 flex-col border-t border-white/10">
      <div className="flex items-center gap-2 p-3">
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Assets</p>
        <NativeSelect
          className="ml-auto w-32"
          value={assetFilter}
          onChange={(event) => setAssetFilter(event.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </NativeSelect>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="grid grid-cols-2 gap-1.5 p-2">
          {assets.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => addAsset(asset.id, activeViewport?.worldPointInFront())}
              className={cn(
                "rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-left text-[11px] leading-tight hover:border-teal-300/40 hover:bg-teal-300/10",
              )}
              title={`Place ${asset.name}`}
            >
              <span className="block truncate font-medium">{asset.name}</span>
              <span className="text-[10px] text-teal-200/45">{asset.category}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
