"use client";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  bgColor?: string;
}

export default function FilterDropdown({ 
  value, 
  onChange, 
  options,
  bgColor = "var(--bg-black)" 
}: FilterDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: bgColor,
        color: "var(--pure-white)",
        border: "1px solid var(--glass-border)",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        cursor: "pointer",
        outline: "none",
        minWidth: "160px",
        backdropFilter: "blur(10px)",
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} style={{ background: bgColor }}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
