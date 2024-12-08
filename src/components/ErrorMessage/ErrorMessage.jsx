import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div>
      <h2 className={css.error}>
        Oops, something went wrong, please, try again later
      </h2>
    </div>
  );
};

export default ErrorMessage;
