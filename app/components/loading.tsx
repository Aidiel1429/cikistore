"use client";

const Loader = () => {
  return (
    <div className="relative w-24 h-24 rotate-45">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-7 h-7 m-0.5 bg-slate-700 animate-square-animation`}
          style={{ animationDelay: `-${index * 1.4285714286}s` }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;
