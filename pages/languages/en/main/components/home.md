---
layout: main/main_containder
component: main_home
lang: en
permalink: /en/

TITLE: Home
# LANDING
LANDING_TITLE_LEFT: Welcome to
LANDING_TITLE_RIGHT: github.io page
LANDING_CTX: |
  Designing and developing software tailored to your goals and workflow, turning your ideas into functional, effective solutions that streamline processes, improve efficiency, automate tasks, and help your business grow.
# ABOUT
ABOUT: About Me
ABOUT_HELLO: |
  I'm a software developer based in Kraków, with experience building backend systems, web applications, APIs, and AI-powered solutions.

  My work spans Python development, REST APIs, databases, cloud services, frontend technologies, and LLM-based applications. I enjoy working across the stack and turning complex requirements into reliable, maintainable, and user-focused software.

  My academic background combines computer science and game development, giving me a strong technical foundation along with an interest in interactive applications, creative problem-solving, and user experience.

  I'm comfortable exploring new technologies and adapting to different projects, whether that's backend development, frontend work, full-stack applications, AI integration, or other software engineering challenges.
# ANALYTICS
ANALYTICS_TITLE: Analytics Overview
ANALYTICS_DESCRIPTION: A quick breakdown of programming languages, categories, and additional metrics on WakaTime.
ANALYTICS_LANGUAGES: Programming Languages
ANALYTICS_CATEGORIES: Categiries
ANALYTICS_OS: Operating Systems
ANALYTICS_EDITORS: Editors
ANALYTICS_DATA_POWERED: Dane dostarczone przez

PROJECTS:
  - title: Projects
    children:
    - title: Comertial
      children:
      - title: Full Stack Developer
        company: ArmsLength AI
        started: 12.2023
        ended: 04.2026
      - title: Intern for RESTful API Development in Spring Boot
        company: CodersPeak
        started: 08.2018
        ended: 11.2018
    - title: Personal  

EDU:
  - title: Education
    children:
    - title: General
      children:
      - title: Master degree
        started: 2020
        ended: 2023
        place: Uniwersytet Jagielloński w Krakowie
        subject: Computer Science of Video Games
      - title: Bachelor degree
        started: 2015
        ended: 2018
        place: Wyższa Szkoła Ekonomii i Informatyki w Krakowie
        subject: Computer Science of Video Games
    - title: Certyfikaty
      children:
      - issued: 09.2026
        expired: 
        title: The Complete Python Developer
        issued_by: Udemy
        id: UC-24cd4eb9-8def-4827-829a-7131d8dd4af5
        url: https://www.udemy.com/certificate/UC-24cd4eb9-8def-4827-829a-7131d8dd4af5

TECHNOLOGIES:
  - title: Technologies

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