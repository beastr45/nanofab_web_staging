---
title: "Machines"
description: "Every machine in the Minnesota Nanofabrication Club's student-built fab, on one page: what it does, where the build stands, and a link to its documentation."
lead: "Every tool in the fab, on one page. Open a card for the write-up, or jump to its full documentation."

# Each machine is one Markdown file in this folder, shown as a card on
# this page. Machines do NOT get pages of their own (their long-form
# documentation lives on the docs site), so the cascade below stops
# Hugo from rendering them while keeping them listed for this page and
# the Team section. README, "Add or edit a machine".
cascade:
  - build:
      render: never
      list: always
    target:
      kind: page
---
