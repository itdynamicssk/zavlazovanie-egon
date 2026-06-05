# EGON — web (zavlazovanie-egon.sk)

Statický web (HTML + CSS + JS + obrázky/video). Bez buildu, bez servera.

## Štruktúra
- `index.html` — hlavná stránka (one-page, produkčná verzia bez dev-skriptov)
- `styles.css`, `script.js` — štýly a interakcie
- `image-slot.js` — galéria „Ukážky" (drag-and-drop fotky)
- `assets/` — logo, fotky, hero video, logá značiek a referencií
- `dokumenty/` — GDPR a Zásady cookies
- `robots.txt`, `sitemap.xml` — SEO
- `.htaccess` — HTTPS redirect + bezpečnostné hlavičky + cache + 301 presmerovania zo starého webu
- `.github/workflows/deploy.yml` — automatický deploy na FTP pri `git push`

## Nasadenie na WebGlobe cez GitHub Actions (SFTP)
1. V GitHub repozitári otvor **Settings → Secrets and variables → Actions** a pridaj:
   - `FTP_SERVER` — hostname servera (bez `sftp://` a bez portu), napr. `egonsk.sftp.websupport.sk`
   - `FTP_USERNAME` — SFTP používateľ z WebGlobe
   - `FTP_PASSWORD` — SFTP heslo z WebGlobe
2. Workflow sa pripája cez **SFTP na porte 222** a nahráva do `./public_html/` (over, či je to tvoj webroot).
3. `git push` do vetvy `main` → web sa automaticky nahrá. Spustiť sa dá aj ručne cez **Actions → Run workflow**.

## Bezpečnosť
- Zapni **HTTPS** vo WebGlobe (Let's Encrypt zadarmo). `.htaccess` presmeruje HTTP → HTTPS.
- `.htaccess` nastavuje hlavičky: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy.
- Žiadne tajomstvá v kóde — FTP údaje sú len v GitHub Secrets.
- Google Analytics načítavaj až po súhlase (cookie lišta je pripravená).

## Údaje na doplnenie
- Reálny odkaz na Facebook (footer + kontakt).
