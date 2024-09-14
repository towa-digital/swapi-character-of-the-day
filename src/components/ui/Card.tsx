import clsx from "clsx";
import { Header } from "react-aria-components";

export default function Card({
  header,
  className = "",
  children,
}: React.PropsWithChildren<{ header: string; className?: string }>) {
  return (
    <article
      className={clsx(
        "p-4 bg-[#616161]/20 rounded-lg flex flex-col backdrop-blur-[20px]",
        className
      )}
    >
      <Header className="uppercase tracking-widest text-[0.625rem] opacity-50 h-5">
        {header}
      </Header>
      <div>{children}</div>
    </article>
  );
}
