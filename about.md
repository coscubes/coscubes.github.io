---
layout: page
title: About
permalink: /about/
---

<img class="avatar" src="{{ '/images/Me.jpg' | relative_url }}" alt="Kaustubh Sakhalkar" width="160" height="160">

{% comment %}
This is a bio, not an employment history: it covers less ground than cv.md
does, by choice. The prose is deliberately written so that no sentence claims
one role followed directly from another — keep it that way, and don't add
connecting phrases to make the chronology look continuous.

Liquid comments like this are stripped at build time and never reach the
published page source.
{% endcomment %}

I am an applied scientist at [Amazon](https://www.amazon.science/author/kaustubh-sakhalkar), where I work on generative AI — multi-agent LLM systems, and the evaluation
machinery needed to tell whether they actually work.

I studied visual computing at [Saarland University](https://saarland-informatics-campus.de/en/)
(Universität des Saarlandes) in Germany from 2019 to 2023. My master's thesis looked at
invertibility in neural networks and transformers, showing that one architecture can do
both discriminative and generative learning. 
I also tutored the Neural Networks course there for two years and
built a small teaching library for its exercises. Before that I earned a bachelor's degree
in computer science and bioinformatics from [VIT University](https://vit.ac.in/) in India
in 2018.

My research background is in video understanding. During my undergraduate studies I had the
opportunity to visit the [STARS](https://team.inria.fr/stars/en/) team at
[INRIA Sophia Antipolis](https://www.inria.fr/en/centre-inria-sophia-antipolis-mediterranee),
where I worked with [François Brémond](http://www-sop.inria.fr/members/Francois.Bremond/) on
finding the most effective representations for learning the human actions that we perform
every day — the work behind most of my [publications]({{ '/publications/' | relative_url }}).
<!-- Earlier I was a computer vision research intern in
Dr. [Ujjwal Bhattacharya](https://scholar.google.co.in/citations?user=Sv_ONBAAAAAJ&hl=en)'s
group at the [Indian Statistical Institute](https://www.isical.ac.in/~ujjwal/) in Kolkata,
where I worked on text segmentation. I then spent a year at DreamVU as an applied computer
vision engineer, building depth and disparity pipelines from omnidirectional stereo and
getting them to run in real time on embedded hardware. -->

I grew up in the quaint city of [Pune](https://en.wikipedia.org/wiki/Pune), India, where I
also did my schooling. I have a proclivity for chess, country music, good reads and hiking.
I was also part of [SEDS-VIT](https://vit.sedsindia.org/about%20us.html) and
[Creation Labs](https://github.com/CreationLabsVIT).

*Feel free to email me if you are looking for project collaborations.*

## Research interests

I came up through computer vision, and video understanding in particular: representations
for human action recognition, learning from limited labels, and what a model should keep
from a sequence of frames rather than a single image.

These days most of my work is on language models — multi-agent systems, and the evaluation
that decides whether they are any good. The question that carries over from vision is the
same one: what a model ought to represent, and how you would know if it represented the
wrong thing.

## News

{% comment %}
TODO: newest first. Prune anything that has stopped being interesting.
{% endcomment %}

<ul class="news">
  <li><span class="news__date">Aug 2026</span>
      <span>Joined Amazon as an applied scientist.</span></li>
  <li><span class="news__date">Jan 2023</span>
      <span>Finished my M.Sc. in Visual Computing at Saarland University.</span></li>
  <li><span class="news__date">2021&ndash;23</span>
      <span>Tutored the Neural Networks course at Saarland University (WS21/22 and WS22/23).</span></li>
  <li><span class="news__date">Apr 2020</span>
      <span>Selected for the <a href="http://mlss.tuebingen.mpg.de/2020/index.html">Machine Learning Summer School</a> in Tübingen, 180 of 1200 applicants. Held online that year.</span></li>
  <li><span class="news__date">Dec 2018</span>
      <span>Attended ICVGIP&nbsp;2018 in Hyderabad &mdash; short talk on my paper.</span></li>
  <li><span class="news__date">Jul 2018</span>
      <span>Three papers accepted at different conferences. Big thank you to my collaborators.</span></li>
</ul>
