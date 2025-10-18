'use client';

interface Props {
  error: Error,
}

const Error  = ({error}: Props) => {
  return (
    <div style={{ padding: "15px", textAlign: "center" }}>
      <p>  There is an error. Please, try again. {error.message}</p>
      </div>
  );
}

export default Error;

