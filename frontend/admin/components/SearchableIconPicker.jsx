import React, { useEffect, useState } from "react";
import * as ReactIcons from "react-icons/fa";

const iconNames = Object.keys(ReactIcons);

export default function SearchableIconPicker({
  selectedIcon,
  setSelectedIcon,
}) {
  const [search, setSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState([]);

  useEffect(() => {
    const matches = iconNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredIcons(matches.slice(0, 20)); // show top 20 matches
  }, [search]);

  const IconPreview = selectedIcon ? ReactIcons[selectedIcon] : null;

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full text-black"
        placeholder="Search icon (e.g. FaHeart)"
      />

      {search && (
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto mt-2 border border-gray-200 rounded p-2 bg-white text-black">
          {filteredIcons.map((iconName) => {
            const Icon = ReactIcons[iconName];
            return (
              <button
                key={iconName}
                onClick={() => {
                  setSelectedIcon(iconName);
                  setSearch("");
                }}
                className={`flex items-center gap-2 p-2 border rounded hover:bg-gray-100 transition ${
                  selectedIcon === iconName ? "bg-gray-200" : ""
                }`}
              >
                <Icon className="text-lg" />
                <span className="text-sm">{iconName}</span>
              </button>
            );
          })}
        </div>
      )}

      {IconPreview && (
        <div className="mt-3 text-center">
          <IconPreview className="inline-block text-4xl text-support" />
          <p className="text-sm mt-1 text-gray-600">{selectedIcon}</p>
        </div>
      )}
    </div>
  );
}
