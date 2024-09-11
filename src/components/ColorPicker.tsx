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
      <Button className="hover:cursor-pointer flex gap-2 items-center">
        <ColorSwatch
          color={color}
          className="size-8 border border-neutral-500 rounded"
        />
        <span className="font-semibold">{label}</span>
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
