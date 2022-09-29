interface Props {
  title?: string;
  isDelivered: boolean;
}

function Badge({ title, isDelivered }: Props) {
  return (
    <div
      className={`payment-badge ${
        title?.toLowerCase() === "paid" || isDelivered ? "success" : "due"
      }`}
    >
      <span>
        {isDelivered
          ? "Delivered"
          : title?.toLowerCase() === "paid"
          ? "Paid"
          : "Due"}
      </span>
    </div>
  );
}

export default Badge;
