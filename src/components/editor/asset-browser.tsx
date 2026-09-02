"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NativeSelect } from "@/components/editor/fields";
import { activeViewport } from "@/lib/runtime/viewport-engine";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "all",
  "imported",
  "nature",
  "buildings",
  "beach",
  "water",
  "vehicles",
  "terrain",
  "props",
  "characters",
  "other",
];

export function AssetBrowser() {
  const catalog = useEditor((state) => state.catalog);
  const assetFilter = useEditor((state) => state.assetFilter);
  const setAssetFilter = useEditor((state) => state.setAssetFilter);
  const addAsset = useEditor((state) => state.addAsset);
  const search = useEditor((state) => state.search);
  const importMeshes = useEditor((state) => state.importMeshes);
  const removeImportedAsset = useEditor((state) => state.removeImportedAsset);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dropping, setDropping] = useState(false);
  const [busy, setBusy] = useState(false);

  const assets = useMemo(() => {
    return catalog.filter((asset) => {
      if (assetFilter === "imported" && !asset.imported) return false;
      if (assetFilter !== "all" && assetFilter !== "imported" && asset.category !== assetFilter) {
        return false;
      }
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return asset.name.toLowerCase().includes(query);
    });
  }, [catalog, assetFilter, search]);

  async function handleFiles(list: FileList | File[] | null) {
    const files = [...(list ?? [])];
    if (files.length === 0) return;
    setBusy(true);
    try {
      const imported = await importMeshes(files);
      toast.success(
        imported.length === 1
          ? `Imported ${imported[0].name} and placed it in the scene`
          : `Imported ${imported.length} meshes`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not import mesh");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col border-t border-white/10",
        dropping && "bg-teal-400/10",
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setDropping(true);
      }}
      onDragLeave={() => setDropping(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDropping(false);
        void handleFiles(event.dataTransfer.files);
      }}
    >
      <div className="flex items-center gap-2 p-3">
        <p className="text-[10px] font-medium tracking-[0.16em] text-teal-200/70 uppercase">Assets</p>
        <NativeSelect
          className="ml-auto w-28"
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
      <div className="px-3 pb-2">
        <input
          ref={fileRef}
          type="file"
          accept=".glb,.gltf,.fbx,model/gltf-binary,model/gltf+json"
          multiple
          className="hidden"
          onChange={(event) => {
            void handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-lg border border-dashed border-teal-200/30 bg-white/5 px-2 py-2 text-[11px] text-teal-100/80 hover:border-teal-300/50 hover:bg-teal-300/10 disabled:opacity-60"
        >
          {busy ? "Importing…" : "Import GLB / FBX"}
        </button>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="grid grid-cols-2 gap-1.5 p-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={cn(
                "rounded-lg border border-white/10 bg-white/5 text-left text-[11px] leading-tight hover:border-teal-300/40 hover:bg-teal-300/10",
                asset.imported && "border-teal-300/25",
              )}
            >
              <button
                type="button"
                onClick={() => addAsset(asset.id, activeViewport?.worldPointInFront())}
                className="w-full px-2 py-2 text-left"
                title={`Place ${asset.name}`}
              >
                <span className="block truncate font-medium">{asset.name}</span>
                <span className="text-[10px] text-teal-200/45">
                  {asset.imported ? `imported · ${asset.format}` : asset.category}
                </span>
              </button>
              {asset.imported ? (
                <button
                  type="button"
                  className="w-full border-t border-white/10 px-2 py-1 text-[10px] text-teal-200/55 hover:text-red-200"
                  onClick={() => void removeImportedAsset(asset.id)}
                >
                  Remove file
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
