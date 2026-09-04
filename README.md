# UST Management Consulting Club

The website for the University of St. Thomas Management Consulting Club — a static, dependency-free
site on GitHub Pages, live at management-consulting.club.

**Status:** Production · 36 commits · public

[![live](https://img.shields.io/badge/live-management--consulting.club-1D1D1F?style=flat)](https://management-consulting.club)

|  |  |
|---|---|
| **What it is** | The club's public website and partnership intake form |
| **Who it's for** | UST students joining the club, and companies wanting to work with it |
| **Live at** | [management-consulting.club](https://management-consulting.club) |
| **Stack** | Hand-written HTML, CSS and JavaScript · Formspree · GitHub Pages |
| **Status** | Production · no build step, no dependencies · custom domain with HTTPS enforced |

## What it is

The Management Consulting Club is a student organization at the University of St. Thomas that puts
undergraduates on real client projects, case competitions and workshops with practising
consultants. Before this site existed the club lived entirely inside TommieLink, the university's
student-organization portal — fine for members who already know the club exists, useless as
something to hand a company.

So the site does the two jobs TommieLink cannot. It is a public front door a prospective member or
a sponsor can be sent to, and it turns "we should get involved somehow" into a structured
application. The **Partnership Configurator** is a multi-step form that asks who you are, what kind
of partner you want to be — guest speaker, office visit, case project, mentor — and what you can
commit to, then summarises the answers back before submitting. Officers get a filled-in brief
instead of a one-line email.

Everything is hand-written HTML, CSS and JavaScript. There is no framework, no build step and no
package manager, which is the point: an incoming officer with no web experience can edit one file
and see the change live. Club leadership rotates annually, and a site nobody on the committee can
maintain is a site that goes stale.

## What it covers

- **About** — what the club does: client projects, case competitions, professional development
- **Leadership team** — current officers and the faculty advisor, edited in `index.html`
- **Partnership Configurator** — the multi-step intake form for companies, alumni and educators
- **Member resources** — links into TommieLink for events, registration and membership
- **Contact and newsletter** — short forms that post to Formspree
- **Legal** — standalone privacy policy and terms-of-service pages

## Quickstart

There is nothing to build. Open the file, or serve the folder if you want the fonts and forms to
behave as they do in production.

```bash
gh repo clone ever-just/USTMCC && cd USTMCC
python3 -m http.server 8000        # http://localhost:8000
```

Edit `index.html`, commit to `main`, and GitHub Pages publishes within a minute.

## Repository layout

```text
.
├── index.html              # the whole site: home, about, team, partners, resources, contact
├── style.css               # all styling — UST purple (#663399), responsive breakpoints
├── script.js               # nav, scroll animations, and the multi-step configurator logic
├── privacy-policy.html     # standalone legal page
├── terms-of-service.html   # standalone legal page
├── MCC-Logo.jpeg           # club mark used in the header
└── CNAME                   # management-consulting.club — do not delete
```

The three form endpoints (partnership, contact, newsletter) all POST to a single Formspree form ID
declared inline in `index.html`. There is no backend in this repository and no data is stored here.

## Deployment

| | |
|---|---|
| Host | GitHub Pages, served from `main` |
| Domain | `management-consulting.club`, set by the `CNAME` file, HTTPS enforced |
| Deploy | Push to `main`. There is no workflow file; Pages builds it. |
| Rollback | `git revert <sha> && git push` — the next Pages build serves the reverted tree |

> [!IMPORTANT]
> Deleting or renaming `CNAME` drops the custom domain and the site falls back to
> `ever-just.github.io/USTMCC`. Every commit that touches the root must keep it.

## Known limitations

- **Form delivery depends on Formspree.** If the plan's submission cap is reached,
  submissions are rejected and the club never sees them. Nothing in this repository monitors that.
- **The leadership roster is hard-coded** in `index.html` and has to be edited by hand each
  academic year. It is the first thing to go stale.
- **No analytics and no tests.** There is no measurement of whether the configurator is completed
  or abandoned, and no check that it still works after an edit.

## License

No open-source licence is applied to this repository. Site content, copy, photography and the
club's marks belong to the University of St. Thomas Management Consulting Club and are not
licensed for reuse. Maintained with help from [EVERJUST](https://everjust.app).
