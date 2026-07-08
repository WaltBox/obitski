import { useEffect, useState } from "react";

function currentPath() {
  const raw = window.location.hash.replace(/^#/, "");
  return raw === "" ? "/" : raw;
}

export function useRoute() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onChange = () => {
      setPath(currentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export function navigate(to) {
  if (currentPath() === to) return;
  window.location.hash = to;
}

export function Link({ to, children, className, onClick, ...rest }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };
  return (
    <a href={`#${to}`} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
