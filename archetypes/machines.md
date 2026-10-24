---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
# Which band and process group it sits in (see data/bands.yaml):
#   band: gen1 | gen2 | cheme
#   process (Gen One / Gen Two only): patterning | doping | deposition |
#            characterization | inspection | application | facility
band: "gen1"
process: "patterning"
# The process step it performs, in a few words.
step: ""
# operational | building | planned
status: "planned"
# Order inside its group: lower comes first.
weight: 50
# One plain sentence. Shown on the card before it is opened.
summary: ""
# A photo of the machine, once it exists. Put the file in
# static/images/machines/ and write its path from /images/. It is
# cropped to 4:3 (landscape). Leave it out to show the placeholder.
# image: "/images/machines/my-machine.jpg"
# Only for a subsystem: the file name of the machine it is part of.
# partOf: "maskless-stepper"
# Only if its docs page is somewhere other than machines/<this file>.html:
# docs: "https://..."
---

Write about the machine here, in plain Markdown. This text appears when
someone opens the machine's card on /machines/. Keep it to a few
paragraphs; the full build documentation belongs on the docs site.
