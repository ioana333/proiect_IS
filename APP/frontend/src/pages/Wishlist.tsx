import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./services";

export default function Wishlist() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  return (
    <div className="card">
      <h1>Wishlist</h1>
      {isLoading && <p>Se încarcă…</p>}
      {isError && <p>A apărut o eroare.</p>}
      {!isLoading && data?.length === 0 && <p>Încă nu ai adăugat nimic.</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: ".75rem" }}>
        {data?.map((e) => (
          <li key={e.id} className="card">
            <div style={{ fontWeight: 600 }}>{e.title}</div>
            <div style={{ opacity: .75 }}>{e.city} • {new Date(e.date).toLocaleDateString()} • {e.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
