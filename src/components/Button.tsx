import { Button as RAButton, type PressEvent } from "react-aria-components";

export default function Button({
  label,
  onPress = undefined,
  icon,
}: {
  label: string;
  onPress?: (selected: PressEvent) => void;
  icon: React.ReactNode;
}) {
  return (
    <RAButton
      className="group/button flex gap-3 items-center size-fit"
      onPress={onPress}
    >
      <span className="inline-flex sr-only lg:not-sr-only text-right tracking-tighter text-[0.625rem] max-w-20 leading-normal opacity-50 uppercase font-normal transition-colors group-hover/button:opacity-100">
        {label}
      </span>
      <span className="inline-flex p-3 rounded-full border border-primary/20 bg-primary/10 transition-colors group-hover/button:border-[#00B2A8] group-hover/button::bg-[#004C48] text-primary">
        {icon}
      </span>
    </RAButton>
  );
}
