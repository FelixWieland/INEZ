# # NEZ - Der INtelligente EinkaufsZettel

# Projektbeschreibung

Für die Planung deines Wocheneinkaufs soll die intelligente Einkaufliste deinen Wunsch interpretieren und entsprechende Vorschläge machen.
Die Usability ist für den Anwender einfach zu halten. INEZ macht Vorschläge, korrigiert Eingaben und interpretiert die passenden Mengen.
So soll z.B. die Eingabe "1 Milch" zu "1 Liter Milch" angepasst werden.

Weitere Beispiele:
"1 kartofel" -> "1kg Kartoffeln"
"Butter" -> "1 Stück Butter"
"Möhren" -> "Karotten" 

# Projektanforderungen

- [X] Einen oder mehrere Einträge in der Einkaufsliste anlegen und merken
- [X] Etwaige Tippfehler korrigieren
- [ ] Synonyme ergänzen
- [ ] Mengeneinheiten interpretieren und ausschreiben
- [X] ggf. doppelte Einträge zu einem Eintrag zusammenfassen
- [X] passende Produkte vorschlagen, z.B. "1 Liter Milch" --> "1 Liter Gut&Günstig Milch"

# Inhaltsverzeichnis


* [Development-Mode](#Development-Mode)
* [Production-Mode](#Production-Mode)
* [Genutzte Technologien](#Genutze-Technologien)

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Development-Mode

Um INEZ im Development-Mode zu starten wird NPM 6.4.1 oder höher, sowie Node.js der Version v. 8.12.0 oder höher benötigt. 

Zum installieren der Dependencys muss im Projektverzeichnis `npm install` ausgeführt werden. 

Nach dem erfolgreichen installieren der Dependencys kann das Frontend sowie das Backend mit `npm run start` gestartet werden. Standartmäßg ist der Port 3001 für das Backend und der Port 3000 für das Frontend zuständig.

Im Development-Mode ist für das Frontend und Backend Hot-Reloading aktiviert.

## Production-Mode

Um INEZ im Production-Mode zu starten wird NPM 6.4.1 oder höher, sowie Node.js der Version v. 8.12.0 oder höher benötigt. 

Zum installieren der Dependencys muss im Projektverzeichnis `npm install` ausgeführt werden.

Nach dem erfolgreichen installieren der Dependencys kann das INEZ-Frontend mittels `npm build` gebaut werden. Nach dem erfolgreichen bauen des Frontends kann INEZ mittels `npm run production` gestartet werden. Standartmäßig wird der Port 8000 werwendt. 

Im Production-Mode wird das Frontend und das Backend vom selben Port bedient

## Genutze Technologien

Frontend: React mit Material-UI
Backend: Node.js mit Express.js
Datenhaltung: MongoDB auf dem ATLAS-Free-Tier