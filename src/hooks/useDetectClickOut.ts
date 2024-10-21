import { RefObject, useEffect } from "react";

export default function OutsideClick(
  ref: RefObject<HTMLElement>,
  setIsClicked: (value: boolean) => void,
  isClicked: boolean
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsClicked(false);
      } else {
        setIsClicked(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return isClicked;
}
