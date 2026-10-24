---
title: "Inkjet Microplotter"
band: "gen2"
process: "application"
step: "Application"
status: "building"
weight: 10
summary: "Prints material onto the wafer one droplet at a time."
---

The microplotter takes the opposite approach to everything else in the fab.

Conventional processing is *subtractive and parallel*: coat the whole wafer,
pattern the whole wafer, etch the whole wafer, remove what you don't want.
Enormous throughput, but every step needs resist, chemistry, and a mask.

Direct-write is *additive and serial*: put material only where it belongs,
one line at a time. Far slower, but there's no mask, no resist, and no etch
chemistry involved at all — and a design change is a new toolpath file.

That makes it the right tool for prototyping conductive traces, repairing a
broken interconnect on an otherwise good wafer, and depositing materials that
don't survive standard lithography chemistry.
