import './FormInput.css';

const FormInput = ({ label, ...otherProps }) => {
  const inputLabelClassName =
    otherProps.value &&
    typeof otherProps.value === 'string' &&
    otherProps.value.length
      ? 'shrink form-input-label'
      : 'form-input-label';

  return (
    <div className="group">
      <input className="form-input" {...otherProps} autoComplete="off" />
      {label && (
        <label className={inputLabelClassName} htmlFor="displayName">
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
