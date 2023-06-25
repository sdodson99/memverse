'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
