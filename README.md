# Cano Team Martial Arts

Aplicación React + Vite conectada a Supabase. El sitio público usa los registros activos de Supabase para disciplinas, horarios, galería y eventos, y los registros existentes de testimonios.

## Configuración

1. Crear `.env.local` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (clave pública anon/publishable; nunca usar service role ni secretos en el navegador).
2. Ejecutar `supabase/migrations/20260924_auth_rls.sql` en el SQL Editor del proyecto Supabase. Revisar las políticas existentes para las tablas y `storage.objects`: las políticas permisivas de PostgreSQL se combinan con OR.
3. Confirmar que el bucket público `cano-team` y sus políticas admiten lectura pública y escritura de administradores, con MIME y límites coherentes con la aplicación.
4. Configurar en Supabase Auth las URLs de redirección local y de producción (incluido `/mi-cuenta`) y habilitar Google OAuth con sus credenciales de proveedor.
5. Desplegar `supabase/functions/admin-profile-emails` con la Supabase CLI para que el panel pueda buscar alumnos por email. La función valida la sesión y `profiles.role` antes de usar Auth Admin; su service role queda en el entorno de Edge Functions.
6. Registrar al primer administrador, comprobar su UUID y promoverlo desde un SQL Editor de confianza con la consulta comentada al final de la migración.

La migración crea automáticamente `profiles` al registrar un usuario y asigna `role = 'user'`. Un usuario no puede cambiar su propio rol. El panel `/admin` también verifica el rol para la navegación, y RLS en Supabase protege las tablas y Storage.

## Desarrollo

```sh
npm install
npm run dev
```

Verificaciones disponibles: `npm run lint` y `npm run build`.

## Pagos

`/mi-cuenta` muestra cuotas y pagos existentes. El botón de pago informa que falta configurar el backend seguro. La integración real requiere una Supabase Edge Function y credenciales/documentación oficiales de Payway; el frontend no contiene secretos ni simula aprobaciones.
