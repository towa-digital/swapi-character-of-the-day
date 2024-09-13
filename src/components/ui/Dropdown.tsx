import clsx from "clsx";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  type Selection,
} from "react-aria-components";
import Button from "@/components/ui/Button";

export default function Dropdown({
  items,
  label,
  selected,
  onChange,
  icon,
}: {
  label: string;
  items: Iterable<{ key: string | number; label: string }>;
  selected: Selection;
  onChange: (selected: Selection) => void;
  icon: React.ReactNode;
}) {
  return (
    <MenuTrigger>
      <Button label={label} icon={icon} />
      <Popover>
        <Menu
          items={items}
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={onChange}
          className="flex flex-col gap-2 min-w-44 p-2 bg-neutral-900 backdrop-blur-sm border border-neutral-500 rounded shadow"
        >
          {(item) => (
            <MenuItem
              id={item.key}
              className={({ isSelected, isHovered }) =>
                clsx("hover:cursor-pointer px-2 py-1.5", {
                  "font-bold bg-purple-500 rounded": isSelected || isHovered,
                })
              }
            >
              {item.label}
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
