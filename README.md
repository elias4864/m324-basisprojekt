# Aufgabe 5A

## Projekt

Ich habe im Basisprojekt `m324-basisprojekt` gearbeitet.

Das Projekt besteht aus zwei Teilen:

- `frontend/`: React-Frontend
- `backend/`: Java Spring-Boot-Backend

## Ziel

Es wurde eine Pipeline erstellt, welche bei jedem Pull Request gestartet wird.

Die Pipeline buildet die Software.

Das bedeutet:

- Aus dem React-Projekt werden HTML-,  JS- und CSS-Dateien generiert.
- Aus dem Java-Projekt wird mit Maven ein WAR-File generiert.

Tests werden in dieser Pipeline nicht ausgefuehrt.

## Pipeline

Die Pipeline befindet sich in folgender Datei:

`.github/workflows/build.yml`

Da dieses Projekt auf GitHub liegt, wurde GitHub Actions verwendet.

Die Pipeline wird durch diesen Trigger gestartet:

```yaml
on:
  pull_request:
    branches:
      - main
