# 🌍 BlueMap 3D • Servidor de Minecraft para la Web

Visor 3D interactivo nativo de **BlueMap** para tu mundo de Minecraft, optimizado para ejecutarse en local o publicarse gratis en **Cloudflare Pages**.

---

## 🚀 Cómo usar en tu PC (Local)

1. Haz doble clic en **`start.bat`**.
2. Elige una opción:
   - **`1`**: Iniciar el servidor web local (`http://localhost:8100/`).
   - **`2`**: Re-renderizar el mapa completo si hiciste nuevas construcciones.
   - **`3`**: Iniciar servidor y vigilar cambios en tiempo real.
   - **`4`**: Desplegar en Cloudflare Pages con Wrangler.

---

## ☁️ Cómo subir a Cloudflare Pages (Gratis 24/7)

La web completa de BlueMap está en la carpeta **`web`** (pesa poco y tiene solo ~1.500 archivos, muy por debajo del límite de 20.000).

### Opción A: Desde la web de Cloudflare (Sin comandos)
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com/) > **Workers & Pages** > **Create Application** > pestaña **Pages**.
2. Selecciona **Upload assets** (Subida directa).
3. Ponle un nombre a tu proyecto (ej: `mi-mundo-minecraft`).
4. **Arrastra y suelta la carpeta `web`** de este proyecto.
5. Haz clic en **Deploy site**. ¡Listo! Te dará tu enlace `.pages.dev` público.

### Opción B: Por Terminal con 1 comando
```powershell
npx wrangler pages deploy web --project-name=mi-mundo-minecraft
```

---

## 🔄 ¿Cómo actualizar el mapa cuando construyan cosas nuevas?

Si juegan más tiempo en el servidor y quieres que aparezcan las nuevas construcciones en la web:

1. **Descarga el nuevo `world.zip`** de Aternos.
2. **Reemplaza la carpeta `world_data/world`** con el nuevo mundo descomprimido.
3. Abre **`start.bat`** y elige la opción **`2`**:
   - BlueMap detectará automáticamente solo los chunks que cambiaron y actualizará la carpeta `web/` en pocos segundos.
4. **Vuelve a subir la carpeta `web`** a Cloudflare Pages (o haz un `git commit` y `git push` en GitKraken).

---

## 📂 Estructura

```text
Web WplaceMine/
├── start.bat             # Acceso directo para Windows
├── render-world.ps1      # Script PowerShell para iniciar o renderizar
├── config/               # Configuraciones de BlueMap (render-mask, threads, etc.)
├── tools/
│   └── bluemap-cli.jar   # Motor BlueMap CLI
├── web/                  # La web 100% nativa de BlueMap (lista para Cloudflare)
│   ├── index.html        # Visor 3D oficial de BlueMap
│   ├── assets/           # Scripts y estilos de BlueMap
│   ├── maps/             # Los bloques y texturas 3D renderizados
│   └── settings.json     # Configuración web de BlueMap
└── world_data/
    └── world/            # Tu mundo de Minecraft extraído (Overworld)
```
