interface Props {
  title?: string;
}

function Badge({ title }: Props) {
  return (
    <div
      className={`payment-badge ${
        title?.toLowerCase() === "paid" ? "success" : "due"
      }`}
    >
      <span>{title}</span>
    </div>
  );
}

export default Badge;
