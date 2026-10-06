import PageHeader from "@/components/shared/PageHeader";
import PlannerClient from "@/components/planner/PlannerClient";
import { places } from "@/data/places";
import { trips } from "@/data/trips";

type PlannerPageProps = {
  searchParams: Promise<{ trip?: string; places?: string }>;
};

export const metadata = {
  title: "จัดทริป",
};

export default async function PlannerPage({ searchParams }: PlannerPageProps) {
  const { trip, places: placesParam } = await searchParams;

  const validIds = new Set(places.map((place) => place.id));

  const initialPlaceIds = placesParam
    ? [...new Set(placesParam.split(",").map((id) => id.trim()))].filter((id) => validIds.has(id))
    : [];

  const tripId = trips.some((t) => t.id === trip) ? trip : undefined;

  return (
    <main>
      <PageHeader
        title="จัดทริปของคุณ"
        description="เลือกสถานที่ จัดลำดับ แล้วแชร์ลิงก์ให้เพื่อน"
      />
      <PlannerClient initialPlaceIds={initialPlaceIds} tripId={tripId} />
    </main>
  );
}
