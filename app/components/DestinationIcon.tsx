type DestinationKind = "store" | "github";

// These marks identify the destination; the surrounding link supplies its accessible name.
export default function DestinationIcon({ kind }: { kind: DestinationKind }) {
  if (kind === "github") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.09 3.29 9.4 7.86 10.93.575.105.785-.25.785-.555 0-.275-.01-.996-.015-1.955-3.2.695-3.875-1.54-3.875-1.54-.525-1.335-1.28-1.69-1.28-1.69-1.045-.715.08-.7.08-.7 1.155.08 1.765 1.185 1.765 1.185 1.025 1.755 2.69 1.248 3.345.955.105-.745.4-1.25.73-1.54-2.555-.29-5.24-1.28-5.24-5.69 0-1.255.45-2.28 1.185-3.085-.12-.29-.515-1.455.11-3.035 0 0 .965-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.82c.98.005 1.965.13 2.885.385 2.195-1.49 3.16-1.18 3.16-1.18.625 1.58.23 2.745.11 3.035.74.805 1.185 1.83 1.185 3.085 0 4.42-2.69 5.395-5.255 5.68.415.36.78 1.06.78 2.14 0 1.545-.015 2.79-.015 3.17 0 .31.21.67.79.555A11.504 11.504 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" /></svg>;
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 3.5 18.6 21M15.2 3.5 5.3 20.7M3.2 16h17.6" />
    </svg>
  );
}
