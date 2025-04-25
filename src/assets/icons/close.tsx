interface SVGProps {
  fill?: string;
  className?: string;
}

export function CloseIcon(props: SVGProps) {
  return (
    <>
      <svg
        className="clickable"
        {...props}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5304"
        width="200"
        height="200"
      >
        <path
          d="M603.216 512L918.56 827.344a32.24 32.24 0 0 1 0 45.6l-45.6 45.6a32.24 32.24 0 0 1-45.6 0L512 603.216 196.656 918.56a32.24 32.24 0 0 1-45.6 0L105.44 872.96a32.24 32.24 0 0 1 0-45.6L420.784 512 105.44 196.656a32.24 32.24 0 0 1 0-45.6l45.616-45.6a32.24 32.24 0 0 1 45.6 0L512 420.784 827.344 105.44a32.24 32.24 0 0 1 45.6 0l45.6 45.6a32.24 32.24 0 0 1 0 45.6L603.216 512z"
          p-id="5305"
        ></path>
      </svg>
    </>
  );
}
