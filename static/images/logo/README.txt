WHAT'S IN THIS FOLDER
=====================

mnfc-wafer-logo.png
  The club logo. Already wired up — hugo.toml has
  logo = "/images/logo/mnfc-wafer-logo.png"
  It shows in the header, the footer, and the browser tab.

  The original export (MNFC_waferlogo.png) had a solid white square
  behind the wafer, which showed as a box against the page. This copy
  has that removed and the padding cropped. If you re-export the logo,
  export it with a TRANSPARENT background, or the box comes back.

UMN_horizontal-digital.svg
UMN_horizontal-reversed-digital.svg
  The full University of Minnesota wordmark (Block M + "University of
  Minnesota"). NOT IN USE and not referenced by any template — kept
  only because they were downloaded. See the warning below.
  "reversed" is the white/gold version, for dark backgrounds.


BEFORE YOU USE THE UNIVERSITY WORDMARK — READ THIS
==================================================

A registered student organization is NOT permitted to use the
University wordmark, the plain Block M, or Goldy. The only University
marks an RSO may use are the "Block M RSO" and "Goldy RSO" marks, and
even those come with rules:

  * They go at the BOTTOM of the page.
  * On their own — separate from the club's logo and name.
  * With the disclaimer right there beside them:
      "This group is a Registered Student Organization and is
       independent from the University of Minnesota."

That's what the last block in the footer is for. Put the RSO mark file
in this folder and set, in hugo.toml under [params.umn]:

    rsoMark = "/images/logo/block-m-rso.svg"

The RSO marks are not in the public logo download. Request them from
Student Unions & Activities or University Marketing Communications.

There is no setting to put the wordmark in a header, because there is
no longer a University bar at the top of the site — it was removed, and
the umn.edu / college links moved into the footer as plain text.

If you want a University mark on the site, the answer is the Block M
RSO mark in the footer block described above. Check with your Student
Unions & Activities advisor first. Full detail is in README section 8.
