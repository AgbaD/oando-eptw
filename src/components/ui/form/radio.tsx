export default function Radio({ label, ...props }: any) {
  return (
    <label className="base-radio__wrapper">
      <div className="base-radio">
        <input type="radio" {...props} />
        <div className="base-radio__checked-wrapper"></div>
        <div className="base-radio__checked"></div>
      </div>
      {label}
    </label>
  );
}
