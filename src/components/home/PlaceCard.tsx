import Image from "next/image";
import type { Place } from "@/types/place";

type PlaceCardProps = {
  place: Place;
  rank?: number;
};

//  (ยังไม่ตกแต่ง) ให้เพื่อนเติมเองได้ Tailwind
export default function PlaceCard({ place, rank }: PlaceCardProps) {
  return (
    <article>
      <div>
        <Image src={place.image} alt={place.name} width={400} height={300} />
        {rank !== undefined && <span aria-label={`อันดับ ${rank}`}>{rank}</span>}
      </div>

      <div>
        <h3>{place.name}</h3>
        <p>{place.category}</p>
        <p>⭐ {place.rating.toFixed(1)}</p>
      </div>
    </article>
  );
}
