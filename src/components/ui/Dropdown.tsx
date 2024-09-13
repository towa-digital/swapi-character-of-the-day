import clsx from "clsx";
import {
  Collection,
  Header,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Section,
  Text,
  type Selection,
} from "react-aria-components";
import Button from "@/components/ui/Button";
import CheckCircle from "@/icons/CheckCircle";

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
        <Text className="lg:sr-only">Select an item</Text>
        <Menu
          items={items}
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={onChange}
          className="fixed start-0 end-0 bottom-0 lg:static flex flex-col gap-2 min-w-44 py-2 bg-[#2A2A2A] rounded-t-3xl lg:rounded-lg"
        >
          <Section>
            <Header className="py-3 text-center mb-2 lg:sr-only">
              {label}
            </Header>
            <Collection items={items}>
              {(item) => (
                <MenuItem
                  id={item.key}
                  className={({ isSelected, isHovered }) =>
                    clsx(
                      "hover:cursor-pointer px-6 py-3 flex items-center lg:text-xs",
                      {
                        "bg-white/10": isSelected || isHovered,
                      }
                    )
                  }
                >
                  {({ isSelected }) => (
                    <>
                      {item.label}
                      {isSelected && (
                        <CheckCircle
                          width={20}
                          height={20}
                          className="ms-auto"
                        />
                      )}
                    </>
                  )}
                </MenuItem>
              )}
            </Collection>
          </Section>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
