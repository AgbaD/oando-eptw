import { Ref, useEffect } from 'preact/hooks';

const useClickOutside = (ref: Ref<any> | Ref<any>[], callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      const isArray = Array.isArray(ref);
      if (isArray && ref.every((r) => shouldtriggerCallback(r, e))) {
        callback()
      }

      if (!isArray && shouldtriggerCallback(ref, e)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  function shouldtriggerCallback(ref: Ref<any>, e: any) {
    return ref.current && !ref.current.contains(e.target)
  }
}

export default useClickOutside;