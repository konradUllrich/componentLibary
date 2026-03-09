import React, { useState } from "react";
import { IconPicker } from "./IconPicker";

/**
 * Example usage of the IconPicker component
 */
export const IconPickerExample: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [iconStyle, setIconStyle] = useState<"line" | "solid">("line");

  const handleSelectIcon = (icon: {
    category: string;
    name: string;
    className: string;
  }) => {
    setSelectedIcon(icon.className);
    console.log("Selected icon:", icon);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Icon Picker Example</h1>

      {/* Show selected icon */}
      {selectedIcon && (
        <div
          style={{
            padding: "20px",
            marginBottom: "20px",
            background: "#f5f5f5",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <strong>Selected Icon:</strong>
          <i className={selectedIcon} style={{ fontSize: "32px" }} />
          <code style={{ fontSize: "12px", color: "#666" }}>
            {selectedIcon}
          </code>
        </div>
      )}

      {/* Style Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Default Icon Style: </strong>
          <select
            value={iconStyle}
            onChange={(e) => setIconStyle(e.target.value as "line" | "solid")}
            style={{ padding: "8px", marginLeft: "8px" }}
          >
            <option value="line">Line</option>
            <option value="solid">Solid</option>
          </select>
        </label>
      </div>

      {/* Icon Picker Component */}
      <IconPicker
        onSelectIcon={handleSelectIcon}
        selectedIcon={selectedIcon}
        maxHeight="600px"
        defaultStyle={iconStyle}
      />
    </div>
  );
};

export default IconPickerExample;
