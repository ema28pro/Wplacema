# 🌍 Wplacema • Mapa 3D de Minecraft para la Web

Visor 3D interactivo de **BlueMap** para el mundo de Minecraft de Wplacema, publicado en **Cloudflare Workers** (con archivos estáticos desde la carpeta `web`).


## 🚀 Probar en tu PC (Local)

Abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
java -jar tools\bluemap-cli.jar -c config -w
```

Luego abre `http://localhost:8100/`.

> Si tienes un JDK propio, usa su ruta en lugar de `java`, por ejemplo `C:\.jdk\openJdk-25\bin\java.exe`.


## 🔄 Volver a generar el mapa con un mundo nuevo

1. **Descarga el `world.zip`** del servidor (por ejemplo desde Aternos) y descomprímelo.
2. **Reemplaza la carpeta `world_data/world`** del proyecto con el mundo descomprimido.
3. **Renderiza el mapa completo** desde la terminal:
   ```powershell
   java -jar tools\bluemap-cli.jar -c config -f -r
   ```
   Esto actualiza la carpeta `web/`. Puede tardar bastante.
4. **Revisa el resultado en local** con el comando de la sección anterior.
5. **Sube los cambios** a Cloudflare (ver abajo) o haz `git commit` y `git push`.

Si solo cambiaron algunas construcciones, puedes renderizar solo lo modificado con `-ru` (vigila cambios y actualiza en vivo):

```powershell
java -jar tools\bluemap-cli.jar -c config -ru
```

## ☁️ Publicar en Cloudflare

El proyecto se despliega como **Worker** con archivos estáticos (`wrangler.jsonc`). Desde la carpeta del proyecto:

```powershell
npx wrangler deploy
```

El enlace queda en `https://wplacema.<tu-subdominio>.workers.dev`.


## 📂 Estructura

```text
Web WplaceMine/
├── config/               # Configuración de BlueMap (mapa, webapp, servidor)
│   └── maps/overworld.conf   # Zona renderizada (render-mask) y punto de inicio
├── tools/
│   └── bluemap-cli.jar   # Motor BlueMap CLI
├── src/
│   └── worker.js         # Worker: sirve la web y descomprime los .gz
├── web/                  # Web de BlueMap lista para desplegar
│   ├── index.html        # Visor 3D (título, etiquetas OG)
│   ├── assets/           # Scripts y estilos de BlueMap
│   ├── maps/             # Bloques y texturas 3D renderizados
│   └── settings.json     # Configuración web de BlueMap
├── world_data/
│   └── world/            # Mundo de Minecraft extraído (Overworld)
└── wrangler.jsonc        # Configuración de Cloudflare
```
