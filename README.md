# fms-logviewer-backend

## Table of Contents

- [About the Project](#about-the-project)
- [Instructions](#instructions)
  - [Setup](#setup)
  - [Additional Info](#additional-info)
- [License](#license)
- [Contact](#contact)
- [Anleitung](#anleitung)
  - [Inbetriebnahme](#inbetriebnahme)
  - [Allgemeine Infos](#allgemeine-infos)

## About the Project

The Project is the backend for the FileMaker Server LogViewer.

Since FileMaker Server 17 there is no convenient way for reading the log files. This project helps to overcome this circumstance.

## Instructions

### Setup

1. Download zip file from here
2. Unpack the file into a directory at any location on the machine where FileMaker Server is installed
3. Replace certificate files in the "encryption" subdirectory
4. Rename file ".env-example" to ".env" on the command line (ren .env-leer .env)
5. Adapt file ".env"
   - Password for certificate
   - possibly port
6. Customize "server.js" with correct certificate files. Alternatively, the files in the "encryption" directory can be renamed, then this step is omitted.
   - Constants "key", "cert" and "ca"
7. Use "npm install" in the root directory of the application to install all node modules dependencies
8. Start the server with "npm start

### Additional Info

- The firewall of your operating system or network must allow communication on the port specified in ".env" (default is 3050)
- The user running the Node.js server must have read permissions for the FileMaker Server "Logs" directory.
- To test the functionality, the address "https://localhost:3050/event" can be called locally in your browser. In the sucessfull response you will see the content of "Event.log" in JSON format in the browser window.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Adam Augustin - [@agametis](https://twitter.com/agametis) - mail.github@agametis.de

Project Link: [https://github.com/agametis/fms-logviewer-backend](https://github.com/agametis/fms-logviewer-backend)

## Anleitung

### Inbetriebnahme

1. Download Zip-Datei von hier
2. Entpacke in ein Verzeichnis an beliebiger Stelle auf dem Rechner, auf dem der FileMaker Server installiert ist
3. Ersetze Zertifikat-Dateien im "encryption" Unterverzeichnis
4. Datei ".env-example" auf der Kommandozeile in ".env" umbenennen (ren .env-leer .env)
5. Datei ".env" anpassen
   - Passwort fürs Zertifikat
   - eventuell Port
6. "server.js" mit korrekten Zertifikatsdateien anpassen. Alternativ können die Dateien im Verzeichnis "encryption" umbenannt werden, dann entfällt dieser Schritt
   - Konstanten "key", "cert" und "ca"
7. "npm install" im Hauptverzeichnis der Anwendung, um alle Node-Module zu installieren
8. mit "npm start" den Server starten

### Allgemeine Infos

- Die Firewall des Betriebssystem bzw. des Netztwerkes muss die Kommunikation auf dem Port (standard ist 3050) zulassen, welcher in ".env" definiert ist
- Der User, unter dem der Node.js Server läuft, muss Leserechte für das "Logs"-Verzeichnis des FileMaker Server haben
- Zum Testen der Funktionalität kann lokal die Adresse "https://localhost:3050/event" im Browser aufrufen werden. Als Antwort muss man der Inhalt von "Event.log" im JSON-Format im Browser sehen
