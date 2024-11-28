import { useCallback, useState } from "preact/hooks";

interface HookProps {
  [key: string]: boolean;
}

const useModal = <T extends HookProps>(props: T): {modals: T, toggle: (key: keyof typeof props) => void} => {
  const [state, setState] = useState(props);

  const toggle = useCallback((key: keyof typeof props) => {
    setState(s => {
      const newState: any = {...s};  
      newState[key] = !newState[key];

      return newState;
    });
  }, []);
  
  return { modals: state, toggle }
}

export default useModal;