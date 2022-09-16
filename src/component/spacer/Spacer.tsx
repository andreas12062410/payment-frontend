interface Props {
  width?: number;
  height?: number;
}
function Spacer({ height = 0, width = 0 }: Props) {
  return width === 0 ? (
    <div style={{ height: `${height}px` }} />
  ) : (
    <div style={{ width: `${width}px` }} />
  );
}

export default Spacer;
