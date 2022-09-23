interface Props {
  title?: string;
}

enum PaymentStatus {
  paid = "success",
  due = "due",
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
