"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Place } from "@/types/place";

type PlaceMapProps = {
  places: Place[];
  selectedPlaceId?: string;
};

const CHIANG_MAI_CENTER: [number, number] = [18.7883, 98.9853];

/* =========================
   สีหมุดตามหมวดหมู่
========================= */

const CATEGORY_COLORS: Record<string, string> = {
  culture: "#7c3aed",
  nature: "#16a34a",
  shopping: "#f59e0b",
  art: "#db2777",
  nightmarket: "#2563eb",
  food: "#dc2626",
};

function createMarkerIcon(categoryId: string) {
  const color = CATEGORY_COLORS[categoryId] ?? "#64748b";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 32px;
        height: 42px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      ">
        <svg
          width="32"
          height="42"
          viewBox="0 0 32 42"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0Z"
            fill="${color}"
          />
          <circle
            cx="16"
            cy="15"
            r="6"
            fill="white"
          />
        </svg>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
}

/* =========================
   เลื่อนแผนที่ไปยังสถานที่ที่เลือก
========================= */

function MapFocus({
  places,
  selectedPlaceId,
}: {
  places: Place[];
  selectedPlaceId?: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedPlaceId) {
      return;
    }

    const selectedPlace = places.find(
      (place) => place.id === selectedPlaceId,
    );

    if (!selectedPlace) {
      return;
    }

    map.flyTo(
      [selectedPlace.lat, selectedPlace.lng],
      16,
      {
        duration: 0.8,
      },
    );
  }, [map, places, selectedPlaceId]);

  return null;
}

/* =========================
   ปุ่มตำแหน่งของฉัน
========================= */

function MyLocation() {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert("เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        map.flyTo([latitude, longitude], 16, {
          duration: 0.8,
        });

        setLoading(false);
      },
      () => {
        alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  return (
    <div className="absolute right-3 top-3 z-[1000]">
      <button
        type="button"
        onClick={handleMyLocation}
        disabled={loading}
        className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "กำลังค้นหาตำแหน่ง..." : "📍 ตำแหน่งของฉัน"}
      </button>
    </div>
  );
}

/* =========================
   แผนที่
========================= */

export default function PlaceMap({
  places,
  selectedPlaceId,
}: PlaceMapProps) {
  return (
    <div className="relative isolate z-0 w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={CHIANG_MAI_CENTER}
        zoom={13}
        scrollWheelZoom
        className="h-[400px] w-full md:h-[550px]"
      >
        <MyLocation />

        <MapFocus
          places={places}
          selectedPlaceId={selectedPlaceId}
        />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createMarkerIcon(place.categoryId)}
          >
            <Popup>
              <div className="min-w-[180px]">
                <h3 className="font-semibold">
                  {place.name}
                </h3>

                <p className="mt-1">
                  คะแนน: {place.rating.toFixed(1)}
                </p>

                <a
                  href={`/explore/${place.id}`}
                  className="mt-2 inline-block font-medium underline"
                >
                  ดูรายละเอียด
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block font-medium underline"
                >
                  นำทางด้วย Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}