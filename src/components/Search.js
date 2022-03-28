export default function Search({
  value,
  onChangeHandler,
  keyDownListener,
  keyUpListener,
  err,
}) {
  return (
    <section id="search">
      <div>Search</div>
      <input
        type="text"
        value={value}
        name="searchBar"
        onChange={onChangeHandler}
        onKeyDown={keyDownListener}
        onKeyUp={keyUpListener}
      ></input>
      <span
        style={{
          textAlign: "left",
          color: "red",
          display: err.state ? "block" : "none",
        }}
      >
        {err.message}
      </span>
    </section>
  );
}
