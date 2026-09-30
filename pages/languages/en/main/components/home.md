---
layout: main/main_containder
component: main_home
lang: en
permalink: /en/

# {page} ELEMENTS
TITLE: Home
META:
  description: Szymon Wilk aka WilkDev, software developer based in Kraków specializing in Python, backend systems, web applications, REST APIs, cloud services, and AI-powered solutions. Explore my projects, experience, education, and technical expertise.

#LANDING
LANDING:
  title: Welcome to WilkDev github.io page
  context: |
   Designing and developing software tailored to your goals and workflow, turning your ideas into functional, effective solutions that streamline processes, improve efficiency, automate tasks, and help your business grow.

# ABOUT
ABOUT: 
  title: About Me
  context: |
   My name is Szymon, I'm a software developer based in Kraków, with experience building backend systems, web applications, APIs, and AI-powered solutions.

   My work spans Python development, REST APIs, databases, cloud services, frontend technologies, and LLM-based applications. I enjoy working across the stack and turning complex requirements into reliable, maintainable, and user-focused software.

   My academic background combines computer science and game development, giving me a strong technical foundation along with an interest in interactive applications, creative problem-solving, and user experience.

   I'm comfortable exploring new technologies and adapting to different projects, whether that's backend development, frontend work, full-stack applications, AI integration, or other software engineering challenges.

# PROJECTS
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

# EDU
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
        subject: Computer Science and Econometrics
    - title: Certyfikaty
      children:
      - issued: 09.2026
        expired: 
        title: The Complete Python Developer
        issued_by: Udemy
        id: UC-24cd4eb9-8def-4827-829a-7131d8dd4af5
        url: https://www.udemy.com/certificate/UC-24cd4eb9-8def-4827-829a-7131d8dd4af5

# INFORMATION
INFORMATION:
  - technologies: Technologies
    topics: Topics
    buzzterms: Buzzterms
    tools: Tools

# ANALYTICS
ANALYTICS:
 title: Analytics Overview
 description: A quick breakdown of programming languages, categories, and additional metrics on WakaTime.
 languages: Programming Languages
 categories: Categiries
 os: Operating Systems
 editors: Editors
 powered_by: Dane dostarczone przez

---

{% include main/components/home.html %}