# bikefit-muc.de — Website Mobile BikeFit München

Statische Seite, gehostet auf GitHub Pages unter der eigenen Domain **bikefit-muc.de**.
Kein Framework, kein Build-Schritt, keine Abhängigkeiten: was hier im Repo liegt, ist genau das,
was ausgeliefert wird. Bearbeiten heißt: Datei ändern, committen, pushen — nach ein bis zwei
Minuten ist es online.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette Startseite mit allen Abschnitten. |
| `bikefitting-rennrad-muenchen.html` | Unterseite fürs Rennrad (eigener Text, eigene Suchbegriffe „Bikefitting Rennrad München“). Eine Gravel-Unterseite gibt es bewusst nicht, Gravel steht auf der Startseite. |
| `sitemap.xml`, `robots.txt` | Für Google. Neue indexierbare Seite: in die Sitemap eintragen und `lastmod` pflegen. Impressum und Datenschutz stehen bewusst nicht drin (`noindex`). |
| `assets/menu.js` | Das einzige eigene Skript: Menü auf schmalen Bildschirmen. Startseite und Unterseite laden es. |
| `impressum.html` | Pflichtangaben nach § 5 DDG. |
| `datenschutz.html` | Bisher nur die Gliederung, der ausformulierte Text fehlt noch (siehe unten). |
| `styles.css` | Das gesamte Aussehen, mobil zuerst, ab 800 px das Desktop-Layout. |
| `assets/logo-mark.png` | Bildmarke im Seitenkopf (dunkle Linien auf Transparenz). |
| `assets/favicon.*` | Browser-Tab-Symbol und Startbildschirm-Icon (weiße Marke auf Terracotta). |
| `assets/og-titelbild.jpg` | Vorschaubild, wenn jemand den Link in WhatsApp o. Ä. teilt. |
| `assets/fonts/` | Schrift Manrope, lokal eingebettet (SIL Open Font License, `OFL.txt`). |
| `CNAME` | Sagt GitHub Pages, unter welcher Domain die Seite läuft. Nicht löschen. |
| `.nojekyll` | Schaltet Jekyll ab; sonst würde GitHub Ordner mit Unterstrich ignorieren. |

Quelle der Texte und des Entwurfs ist das Haupt-Repo `bikefit`:
`docs/website/inhalt.md` und `docs/website/mockup/`.

## Was sich regelmäßig ändert

**Einführungspreis-Zähler.** In `index.html` im Abschnitt „Preise“ steht

```html
Noch <b>10</b> von 10.
```

Nach jedem vergebenen Einführungs-Fitting die Zahl um eins verringern. Bei 0 den ganzen Block
`<div class="aktion"> … </div>` entfernen. Über der Zeile steht derselbe Hinweis noch einmal als
Kommentar.

**Fotos.** Es gibt drei Platzhalterflächen (Foto 1 Setup, Foto 2 Laptop mit Overlay, Foto 3
Porträt). Ein Platzhalter sieht so aus:

```html
<div class="foto-platz foto-hero" role="img" aria-label="Platzhalter für Foto 1: …">
  <p>Foto 1 – Setup beim Kunden:<br>…</p>
</div>
```

Zum Ersetzen den ganzen Block durch ein Bild tauschen und die Klasse behalten, damit das
Seitenverhältnis stimmt:

```html
<img class="foto-hero" src="assets/foto-setup.jpg" width="1200" height="900"
     alt="Rennrad auf der Rolle, daneben Kamera auf Stativ und Laptop">
```

`width`/`height` immer mitangeben (sonst springt das Layout beim Laden), Bilder vorher auf
maximal ~1600 px Kantenlänge verkleinern und als JPEG mit Qualität ~80 speichern. Der `alt`-Text
beschreibt, was zu sehen ist — er ersetzt das Bild für Screenreader und wenn es nicht lädt.

## Was bewusst fehlt

- **Datenschutztext.** `datenschutz.html` enthält nur die Gliederung und pro Abschnitt den
  Vermerk „Text folgt“. Das ist Absicht: die Formulierungen sollen aus einem Generator kommen
  (z. B. e-recht24) und gegen die Punkte in `docs/website/inhalt.md` geprüft werden, nicht frei
  erfunden sein.
- **Bewertungs-Sterne im Schema.** Im JSON-LD steht bewusst kein `aggregateRating`: Eigenbewertungen
  auf der eigenen Seite sind für Rich Results nicht zulässig, die Sterne zeigt Google aus dem
  Unternehmensprofil. Das Profil ist in der Fußzeile und im Einführungspreis verlinkt.

## Suchmaschinen (Stand 30.10.2026)

Ziel sind lokale Suchen wie „Bikefitting München“, „Bike Fitting München“ und „Radfitting
München“. Dafür gibt es: LocalBusiness- und WebSite-Schema in `index.html`, Leistung und
Brotkrumen in der Unterseite, Sitemap, `robots.txt`, Canonical-Tags und Open-Graph-Daten. Beim
Ändern von Preisen oder Adresse **das JSON-LD mitändern**, es muss zu den sichtbaren Angaben
passen. Der Abschnitt „Einzugsgebiet“ nennt Stadtteile nur als Beispiele: nur Orte aufführen,
die wirklich angefahren werden.

## Datenschutz im Aufbau

Die Seite lädt **nichts von fremden Servern**: keine Cookies, kein Tracking, keine eingebetteten
Karten, kein Google Fonts (die Schrift liegt unter `assets/fonts/`). Die Google-Links sind
gewöhnliche Verweise, geladen wird erst beim Klick. Deshalb braucht sie auch
keinen Cookie-Banner. Das bleibt nur so, wenn nichts Externes nachträglich eingebunden wird —
ein einziges `<script src="https://…">` oder ein eingebettetes Video kippt diese Aussage und
damit auch den Datenschutztext.

## Farben und Marke

Terracotta `#D97757` und Creme `#FBFAF8` sind dieselben Werte wie im Analyse-Tool
(`bikefit`-Repo, `assets/brand/README.md`). Für Text auf Terracotta benutzt die Seite einen
tieferen Ton (`--terracotta-tief`, `#B85334`) — weißer Text auf dem hellen Terracotta erreicht
nur 3,1:1 Kontrast und wäre für Menschen mit eingeschränkter Sehkraft schwer zu lesen. Die
Begründung steht ausführlich im Kopf von `styles.css`.

## DNS — und was zu tun ist, wenn die Seite mal nicht erreichbar ist

Die Domain liegt bei Strato, gehostet wird bei GitHub Pages. Eingetragen ist:

| Typ | Name | Wert |
|---|---|---|
| A | `@` | `185.199.108.153` |
| CNAME | `www` | `spencerhill42.github.io` |

**Nur ein A-Record statt der von GitHub empfohlenen vier** — Stratos Formular lässt
genau eine eigene IP-Adresse zu. Das ist kein Versehen und im Alltag folgenlos: die vier
GitHub-Adressen sind Anycast, jede einzelne führt bereits auf das weltweite Edge-Netz. Die
Seite hängt also nicht an einer Maschine.

Genau ein Fall bleibt offen, und deshalb steht das hier: **zieht GitHub irgendwann die
Adresse `185.199.108.153` zurück, ist die Seite weg** — ohne Vorwarnung und mit einem
Fehlerbild, das nach „Website kaputt" aussieht statt nach „DNS". Wenn das passiert, ist der
erste Handgriff, bei Strato eine der drei anderen Adressen einzutragen:

```
185.199.109.153
185.199.110.153
185.199.111.153
```

Vorher prüfen, ob es wirklich daran liegt:

```bash
dig +short bikefit-muc.de A && curl -sS -o /dev/null -w '%{http_code}\n' https://bikefit-muc.de
```

`www.bikefit-muc.de` ist davon nicht betroffen: der CNAME löst immer auf alle vier
aktuellen Adressen auf und leitet dann auf die Hauptdomain weiter. Ein Aufruf mit `www`
funktioniert also unter Umständen noch, wenn die nackte Domain nicht mehr geht — das ist
schon der halbe Beweis, dass es am A-Record liegt.

Ein AAAA-Record (IPv6) ist nicht gesetzt. In deutschen Mobilfunknetzen ist das folgenlos,
weil dort DNS64/NAT64 aus dem A-Record eine IPv6-Adresse bildet.

## Veröffentlichen

GitHub Pages baut aus dem Branch `main`, Ordner `/` (root). Ein `git push` genügt; es gibt keinen
Build-Schritt, der schiefgehen könnte.

Lokal ansehen (nicht per Doppelklick öffnen — dann laden die Schriften nicht):

```bash
python3 -m http.server 8765
```

Danach `http://127.0.0.1:8765/` im Browser aufrufen.
