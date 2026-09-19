---
layout: main/main_containder
component: main_home
lang: pl
permalink: /pl/

TITLE: Strona główna
# LANDING
LANDING_TITLE_LEFT: Witam na 
LANDING_TITLE_RIGHT: github.io
LANDING_CTX: |
  Projektowanie i tworzenie oprogramowania dopasowanego do Twoich celów i sposobu pracy, przekształcanie Twoich pomysłów w funkcjonalne i skuteczne rozwiązania, które usprawniają procesy, zwiększają efektywność, automatyzują zadania i pomagają rozwijać Twój biznes.
# ABOUT
ABOUT: O mnie
ABOUT_HELLO: |
  Jestem programistą z Krakowa, który ma doświadczenie w tworzeniu systemów backendowych, aplikacji webowych, API oraz rozwiązań wykorzystujących sztuczną inteligencję.

  W swojej pracy zajmuję się m.in. programowaniem w Pythonie, tworzeniem REST API, bazami danych, usługami chmurowymi, technologiami frontendowymi oraz aplikacjami wykorzystującymi modele językowe (LLM). Lubię pracować na różnych warstwach aplikacji i przekładać złożone wymagania na niezawodne, łatwe w utrzymaniu oraz przyjazne dla użytkownika rozwiązania.

  Moje wykształcenie łączy informatykę z tworzeniem gier, co dało mi solidne podstawy techniczne, a jednocześnie rozwinęło moje zainteresowanie aplikacjami interaktywnymi, kreatywnym rozwiązywaniem problemów oraz doświadczeniem użytkownika.

  Swobodnie poznaję nowe technologie i dostosowuję się do różnych projektów — zarówno w obszarze backendu, frontendu, aplikacji full-stack, integracji rozwiązań opartych na AI, jak i innych wyzwań związanych z tworzeniem oprogramowania.
# ANALYTICS
ANALYTICS_TITLE: Przegląd analityki
ANALYTICS_DESCRIPTION: Szybki przegląd języków programowania, kategorii oraz dodatkowych metryk na WakaTime.
ANALYTICS_LANGUAGES: Języki programowania
ANALYTICS_CATEGORIES: Kategorie
ANALYTICS_OS: Systemy operacyjne
ANALYTICS_EDITORS: Edytory
ANALYTICS_DATA_POWERED: Data powered by

PROJECTS:
  - title: Projects
    children:
    - title: Comertial
      children:
      - title: Programista Fullstack
        company: ArmsLength AI
        started: 12.2023
        ended: 04.2026
      - title: Stażysta ds. Tworzenia RESTful API w Spring Boot
        company: CodersPeak
        started: 08.2018
        ended: 11.2018
    - title: Personal  

EDU:
  - title: Edukacja
    children:
    - title: Ogólnie
      children:
      - title: Stopień magistra
        started: 2020
        ended: 2023
        place: Uniwersytet Jagielloński w Krakowie
        subject: Informatyka Gier Komputerowych
      - title: Stopień inżyniera
        started: 2015
        ended: 2018
        place: Wyższa Szkoła Ekonomii i Informatyki w Krakowie
        subject: Informatyka i ekonometria
    - title: Certificates
      children:
      - issued: 09.2026
        expired: 
        title: The Complete Python Developer
        issued_by: Udemy
        id: UC-24cd4eb9-8def-4827-829a-7131d8dd4af5
        url: https://www.udemy.com/certificate/UC-24cd4eb9-8def-4827-829a-7131d8dd4af5

TECHNOLOGIES:
  - title: Technologie

TECH_STACK:
  - title: Backend
    children:
      - Python
      - Flask
      - SQLAlchemy
      - REST API
      - PostgreSQL
  - title: AI
    children:
      - LLM APIs
      - GPT
      - Azure OpenAI
      - JSON Schema
  - title: Cloud & Infrastructure
    children:
      - Azure
      - S3
  - title: Frontend
    children:
      - Angular


---

{% include main/components/home.html %}
