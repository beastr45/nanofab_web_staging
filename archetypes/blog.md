---
# The headline.
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
# YYYY-MM-DD. Newest posts come first.
date: {{ .Date.Format "2006-01-02" }}
# Optional short label: Build log, Event, Site news.
kicker: ""
# One or two sentences for the post list and link previews.
description: ""
author: ""
# Delete this line to publish.
draft: true
---

Write the post here in Markdown. Use `## headings` for sections.
