import Image from "next/image";
import icon from "./close-icon.svg";

export const CloseIcon = () => {
  return <Image src={icon} width={24} height={24} alt="Close" />;
};
