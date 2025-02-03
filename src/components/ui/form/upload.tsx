import { useMemo } from "preact/hooks";
import Icon from "../icon";

export default function UploadDocument({
  onChange,
  isTouched,
  error,
  label = "",
  onUploadComplete,
  ...props
}) {
  const objectURL = useMemo(() => {
    return props.value ? URL.createObjectURL(props.value) : null;
  }, [props.value]);

  async function handleFileUpload(file) {
    if (!file) {
      console.error("No file provided for upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log(formData, "formData");

    try {
      const response = await fetch(
        // "http://127.0.0.1:3000/api/file/upload",
        "https://eptw.ankursolutions.com/api/file/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      onUploadComplete(data.data);
      console.log(data);

      // return [await response.json(), null];
    } catch (error) {
      return [null, error];
    }
  }

  function handleChange(e) {
    const file = e.currentTarget.files[0];
    onChange(file);
    handleFileUpload(file);
  }

  return (
    <div className="base-upload-field-container">
      {label ? <span className="base-upload-field-label">{label}</span> : null}
      <div className="base-upload-field" data-show-placeholder={!objectURL}>
        <input type="file" {...props} onChange={handleChange} />

        {["image/jpeg", "image/png"].includes(props.value?.type) ? (
          <img src={objectURL} alt={props.value?.name} />
        ) : (
          <object data={objectURL} width="45" height="45">
            <Icon name="upload" />
          </object>
        )}

        <div
          className="base-upload-field__text"
          data-has-error={Boolean(isTouched && error)}
        >
          <p>{props.value?.name ?? "Upload Attachment"}</p>
          {props.value ? (
            <span>{(props.value?.size / 1024).toFixed(2)} KB</span>
          ) : null}
        </div>

        {objectURL ? (
          <button
            className="base-upload-field__close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 24L24 8M8 8L24 24"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
