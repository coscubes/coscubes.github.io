---
layout: page
title: CV
permalink: /cv/
# Parked. Jekyll skips this file entirely, so /cv/ is never built and nothing
# below is served — not even the commented-out sections. The content is kept
# here so it isn't lost. To bring the page back: set this to true (or delete
# the line) and uncomment the CV entry in _config.yml's `nav`.
published: false
---

{%- if site.cv_pdf %}
<p><a class="button" href="{{ site.cv_pdf | relative_url }}">{% include icon.html name="download" %} Download PDF</a></p>
{%- else %}
{%- comment %}
No PDF on the site by deliberate choice: the current CV has your phone number
and plain-text email on page 1, and this page is publicly crawlable. To add one
later, put a (preferably redacted) file in pdfs/ and set `cv_pdf:` in
_config.yml to its path — the download button then appears here by itself.
{% endcomment -%}
{%- endif %}

## Education

**M.Sc. Visual Computing** &middot; Saarland University (Universität des Saarlandes), Saarbrücken, Germany
<br>Oct 2019 &ndash; Jan 2023

**B.Tech. Computer Science**, specialisation in bioinformatics &middot; Vellore Institute of Technology (VIT), Vellore, India
<br>2014 &ndash; 2018

## Experience

**Applied Scientist** &middot; Amazon &middot; India
<br>Aug 2026 &ndash; present

**Associate Tech Lead, Machine Learning** &middot; Intangles Lab &middot; Pune, India
<br>Nov 2023 &ndash; Aug 2026

**Software Developer** &middot; SETES GmbH &middot; Saarbrücken, Germany
<br>Jun &ndash; Aug 2023

**Applied Computer Vision Engineer** &middot; DreamVU &middot; Hyderabad, India
<br>Jun 2018 &ndash; Jun 2019

**Research Intern**, [STARS](https://team.inria.fr/stars/en/) team &middot; INRIA Sophia Antipolis, France
<br>Jan &ndash; May 2018 &middot; Supervisor: Dr François Brémond

**Summer Research Intern** &middot; Indian Statistical Institute, Kolkata, India
<br>May &ndash; Jul 2017 &middot; Supervisor: Dr Ujjwal Bhattacharya

## Skills

**Languages** &middot; Python, C/C++, JavaScript (Node.js, TypeScript), HTML/CSS
<br>**Machine learning** &middot; PyTorch, TensorFlow, LangGraph, JAX, scikit-learn, XGBoost
<br>**Infrastructure** &middot; Docker, Kubernetes, AWS, Airflow, Kafka
<br>**Data** &middot; MongoDB, PostgreSQL, TimescaleDB, Redis
<br>**Focus** &middot; Computer vision, time-series forecasting, language models

<!--
## Selected projects

- **Invertibility in Neural Networks and Transformers** &middot; master's thesis, Saarland University
- **Automatic speech recognition** &middot; transformer speech-to-text
- **Semi-supervised learning library** &middot; pseudo-labelling, VAT and FixMatch
- **Expression recognition in video** &middot; BOLD dataset, Saarland University 
-->

## Publications and talks

Three peer-reviewed papers (MMM 2019, ICVGIP 2018, IPAS 2018) and two invited talks.
The full list with PDFs is on the [publications page]({{ '/publications/' | relative_url }}),
and also on [Google Scholar](https://scholar.google.co.in/citations?user=6ElPOFAAAAAJ&hl=en&oi=ao).

## Activities and awards

- Tutor for Neural Networks Theory and Implementation, Saarland University (WS21/22, WS22/23)
- Selected for the Machine Learning Summer School 2020 in Tübingen, 180 of 1200 applicants
- Chancellor's Special Achievers Award, VIT
<!-- - [SEDS-VIT](https://vit.sedsindia.org/about%20us.html) &mdash; Students for the Exploration and Development of Space, VIT chapter -->
<!-- - Led a team at [Creation Labs](https://github.com/CreationLabsVIT), VIT  -->


## Contact

{{ site.email_display }}
