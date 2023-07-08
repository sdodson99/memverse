'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="bg-primary text-white text-center flex-1 flex flex-col items-center justify-center p-16">
      <h1 className="text-4xl">Oops! Something went wrong.</h1>
      <button
        className="mt-8 bg-white px-8 py-2 rounded text-black hover:bg-gray-200 transition"
        onClick={() => reset()}
      >
        Try again
      </button>
    </section>
  );
}
