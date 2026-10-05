// not-found.tsx
import EmptyState from "@/components/shared/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      icon="🧭"
      title="ไม่พบหน้าที่คุณต้องการ"
      description="ลิงก์อาจผิด หรือหน้านี้ถูกย้ายไปแล้ว"
      actionHref="/"
      actionLabel="กลับหน้าแรก"
    />
  );
}