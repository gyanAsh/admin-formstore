export default function EmptyHome() {
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <img
        src={"/formstore-logo-light.svg"}
        alt="Logo"
        loading="lazy"
        className="dark:hidden block size-16 animate-pulse"
      />
      <img
        src={"/formstore-logo-dark.svg"}
        alt="Logo"
        loading="lazy"
        className="hidden dark:block size-16 animate-pulse"
      />
    </div>
  );
}
