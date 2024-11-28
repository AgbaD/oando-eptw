import { useEffect, useRef, useState } from "preact/hooks";
import * as Yup from "yup";

interface UseFormProps {
  initialValues: Record<string, any>;
  onSubmit: (data: any) => void;
  validationSchema: Yup.ObjectSchema<any>;
}

export default function useForm(props: UseFormProps) {
  const { initialValues = {}, onSubmit, validationSchema } = props;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState({});
  const registeredFields = useRef({});

  useEffect(() => {
    validate(values);
  }, [JSON.stringify(values)]);

  async function validate(data = values) {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (e) {
      const errorDump = {};
      e.inner?.map((e) => (errorDump[e.path] = e.message));
      setErrors(errorDump);
      return false;
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(registeredFields.current);
    const isValid = await validate();
    if (isValid) onSubmit(values);
  }

  function handleChange({ currentTarget: { value, name } }) {
    const _values = { ...values, [name]: value };
    setValues(_values);
  }

  function getFieldProps(name: string) {
    registeredFields.current = { ...registeredFields.current, [name]: true };
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: handleChange,
      onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),
      isTouched: Boolean(touched[name]),
    };
  }

  function setFieldValue(name: string, value) {
    const _values = { ...values, [name]: value };
    setValues(_values);
  }

  return {
    values,
    errors,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    isValid: Object.keys(errors).length === 0,
    reset: () => {
      setErrors({});
      setTouched({});
      setValues(initialValues);
    },
  };
}
