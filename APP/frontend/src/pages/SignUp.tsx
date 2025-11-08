import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "./services";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Narrow the possible `state` shape coming from react-router
  const locState = (location.state as { from?: { pathname?: string } } | undefined) ?? undefined;
  const from = locState?.from?.pathname ?? "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await register({ email, password, username, city });
      navigate(from, { replace: true });
      window.location.href = "/";
    } catch (error: unknown) {
      let message = "Înregistrare eșuată";
      if (typeof error === "object" && error !== null) {
        const errObj = error as { response?: { data?: { error?: string } } };
        message = errObj.response?.data?.error ?? message;
      }
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit} style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1>Autentificare</h1>
      <div style={{ display: "grid", gap: ".75rem" }}>
        <label>
          <div>Email</div>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          <div>Username</div>
          <input className="input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <div>Parolă</div>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <label>
          <div>City</div>
          <input className="input" type="text" value={city} onChange={e => setCity(e.target.value)} />
        </label>
        {err && <div style={{ color: "#ff6b6b" }}>{err}</div>}
        <button className="btn" disabled={loading}>{loading ? "Se conectează…" : "Înregistrează-te"}</button>
      </div>
    </form>
  );
}
