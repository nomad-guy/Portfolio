import "./MButton.css";

export function MButton({ muted }) {
  return (
    <div className="m-button">
      <span className="m-button-key">M</span>
      <span className="m-button-label">{muted ? "MUTED" : "\u266A ON"}</span>
    </div>
  );
}
