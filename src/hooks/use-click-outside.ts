import { useEffect } from "preact/hooks";
import { Ref } from "preact";
import { RefObject } from "preact";

const useClickOutside = (
  ref: Ref<any> | Ref<any>[] | RefObject<any> | RefObject<any>[],
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const isArray = Array.isArray(ref);

      // Check if the click is outside all or one of the refs
      if (isArray && ref.every((r) => shouldTriggerCallback(r, e))) {
        callback();
      } else if (!isArray && shouldTriggerCallback(ref, e)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  function shouldTriggerCallback(ref: Ref<any>, e: MouseEvent): boolean {
    if (ref && "current" in ref) {
      return !ref.current.contains(e.target as Node);
    }
    return false;
  }
};

export default useClickOutside;
