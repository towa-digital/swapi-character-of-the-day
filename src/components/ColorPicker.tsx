import {
  MenuTrigger,
  Button,
  ColorSwatch,
  Popover,
  ColorArea,
  ColorThumb,
  type Color,
} from "react-aria-components";

export default function ColorPicker({
  color,
  label,
  onChange,
}: {
  color: Color;
  label: string;
  onChange: (color: Color) => void;
}) {
  return (
    <MenuTrigger>
      <Button className="group/button bg-gradient-to-r hover:to-primary transition-all from-primary p-px rounded-full hover:cursor-pointer overflow-hidden">
        <span className="py-[0.4375rem] ps-[0.625rem] pe-[0.875rem] bg-[#2e2e2e] group-hover/button:bg-[#183c3a] flex gap-[0.375rem] items-center rounded-full">
          <ColorSwatch color={color} className="size-3 rounded-full" />
          <span className="text-sm">{label}</span>
        </span>
      </Button>
      <Popover>
        <ColorArea
          value={color}
          onChange={onChange}
          className="size-40 mt-2 border border-neutral-500 shadow rounded"
        >
          <ColorThumb className="size-8 rounded-full border-2 border-white" />
        </ColorArea>
      </Popover>
    </MenuTrigger>
  );
}
