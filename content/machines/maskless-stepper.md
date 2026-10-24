---
title: "Maskless Litho Stepper"
band: "gen1"
process: "patterning"
step: "Exposure"
status: "building"
weight: 10
summary: "Projects the pattern straight from a design file."
---

We are designing and building a maskless photolithography stepper: it
draws a circuit pattern onto a photoresist-coated chip straight from a
design file, with no photomask. The full write-up, with diagrams and the
build timeline, is in the docs.

### Optical system

Production lithography machines use photomasks that encode an entire
chip layout, or several. That's efficient, but each mask can cost up
to several million dollars. A cost-efficient alternative uses a
**programmable mask**
([Sam Zeloof](https://www.youtube.com/watch?v=Nxz_ENnmgtI)), hence
"maskless" stepper.

The programmable mask is a **Digital Micromirror Device (DMD)**, found
in most 4K movie projectors: a 2D array of individually programmable
mirrors about 5 µm wide. We repurposed a projector's DMD to display
circuit patterns instead of Batman movies. We removed the original
projection lens, which magnifies the image onto a screen, and replaced
it with a **10× microscope objective** that demagnifies the DMD image
onto the chip.

Micron-scale lithography needs UV or near-UV light, so we replaced the
projector's blue LED with a **410 nm near-UV LED**. The light passes
through the Thorlabs optics and the objective onto the chip. Some of it
reflects back up to a **10:90 beamsplitter** at 45°, which sends 10% of
it into the camera tube so the camera can see the chip.

### Mechatronic system

A silicon wafer can hold a hundred to several hundred chips, or
"dies." A stepper exposes one limited area, an **exposure field**, at
a time. The XYZ stage then moves, or **steps**, to the next field so
the pattern repeats across a larger chip or wafer. Hence the name
"stepper."

Alignment between layers is critical: a small error can ruin the whole
chip. The XYZ stage uses finely threaded **micrometers**, turned by
**NEMA stepper motors**, to move with micron-level accuracy.
**Proximity sensors** are used during homing to set a known reference
position that all later moves are measured from.
