interface Props {
  width?: any;
  height?: number;
  isWidth?: boolean;
}
function Spacer({ height = 0, width = 0, isWidth = false }: Props) {
  return isWidth ? (
    <div style={{ height: `${height}px`, width }} />
  ) : (
    <div style={{ height: `${height}px` }} />
  );
}

export default Spacer;
