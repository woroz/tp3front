import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/authLayout";
import { useAuth } from "../context/authContext";

export default function GoogleExito() {
  const navigate = useNavigate();
  const { sesionDesdeRefresh } = useAuth();
  const iniciado = useRef(false);

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;

    sesionDesdeRefresh()
      .then((payload) => {
        navigate(payload.rol === "alumno" ? "/buscar" : "/profesor", { replace: true });
      })
      .catch(() => navigate("/login?error=google", { replace: true }));
  }, [navigate, sesionDesdeRefresh]);

  return (
    <AuthLayout>
      <div className="auth-heading">
        <h1>Iniciando sesion</h1>
        <p>Un momento...</p>
      </div>
    </AuthLayout>
  );
}