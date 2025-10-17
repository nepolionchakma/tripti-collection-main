import * as React from "react";

interface IItemSelections {
  data: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

const ItemSelections = ({
  data,
  value,
  onChange,
  placeholder = "Select items",
  className = "w-[200px]",
}: IItemSelections) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const toArray = React.useCallback(
    (val: unknown): string[] => {
      if (Array.isArray(val))
        return (val as string[]).filter((v) => data.includes(v));
      if (typeof val === "string")
        return val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .filter((v) => data.includes(v));
      return [];
    },
    [data]
  );
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string[]>(
    isControlled ? toArray(value) : []
  );

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const selected: string[] = isControlled ? toArray(value) : internal;

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  React.useEffect(() => {
    if (isControlled) {
      setInternal(toArray(value));
    }
  }, [isControlled, toArray, value]);

  const setSelected = (next: string[]) => {
    if (onChange) onChange(next);
    else setInternal(next);
  };

  const toggle = (val: string) => {
    setSelected(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );
  };

  const clearAll = () => setSelected([]);

  const filtered = query
    ? data.filter((d) => d.toLowerCase().includes(query.toLowerCase()))
    : data;

  return (
    <div className="flex flex-col gap-2 relative" ref={containerRef}>
      <button
        type="button"
        className={`inline-flex ${className} items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {selected.length ? `${selected.length} selected` : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M12 14.5a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L12 12.086l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 14.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`z-50 mt-1 ${className} overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg absolute top-[40px]`}
          role="listbox"
          aria-multiselectable="true"
        >
          <div className="p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ul className="max-h-36 overflow-auto py-1 text-sm scrollbar-thin">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-gray-500">No item found.</li>
            )}
            {filtered.map((item) => {
              const checked = selected.includes(item);
              return (
                <li key={item} className="px-1">
                  <label className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={checked}
                      onChange={() => toggle(item)}
                    />
                    <span className="text-gray-900">{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-2 border-t px-2 py-2">
            <button
              type="button"
              className="rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              onClick={clearAll}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* <div className="flex flex-wrap gap-2">
        {selected.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800"
          >
            {s}
            <button
              type="button"
              className="ml-1 rounded-full px-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              onClick={() => toggle(s)}
              aria-label={`Remove ${s}`}
            >
              ×
            </button>
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default ItemSelections;
