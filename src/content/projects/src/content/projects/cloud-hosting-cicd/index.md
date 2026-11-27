---
title: "Cloud Hosting, CI/CD & Automated Deployment"
summary: "Deployment of a professional static website using Astro, GitHub, and Cloudflare Workers, with automated build and deployment pipelines, DNS administration, HTTPS, and infrastructure validation."
date: 2026-11-26
tags:
  - Cloudflare
  - CI/CD
  - GitHub
  - Astro
  - DNS
  - Web Infrastructure
draft: false
---

## Project Overview

Designed and deployed a cloud-hosted professional portfolio to document my experience in IT, networking, systems administration, and infrastructure engineering.

The project uses the Astro static site framework, GitHub for source control, and Cloudflare Workers Static Assets for public website hosting.

I adapted the open-source Astro Sphere template and implemented a Git-integrated deployment workflow that automatically builds and publishes website changes.

The website is hosted independently of my home infrastructure, allowing it to remain publicly accessible without relying on the availability of my Proxmox server or residential internet connection.

The project incorporates domain administration, automated deployment, web configuration, troubleshooting, and security considerations.

## Project Objectives

- Establish a publicly accessible professional website.
- Implement version-controlled website development.
- Automate the build and deployment process.
- Host website content independently of home infrastructure.
- Use Markdown-based documentation for technical case studies.
- Maintain separation between public content and private operational documentation.
- Configure and manage a professional domain.
- Establish a foundation for future hybrid cloud and self-hosted infrastructure.

---

## Technologies Used

- Astro static site framework
- TypeScript and JavaScript
- HTML and CSS
- Tailwind CSS
- Markdown and MDX
- Git and GitHub
- Node.js and npm
- Cloudflare Workers Static Assets
- Cloudflare Wrangler
- Cloudflare DNS
- Porkbun domain registration
- HTTPS

---

## Infrastructure Architecture

### Cloud Hosting Model

The portfolio uses a static hosting architecture rather than a continuously running application server.

Astro converts source files, components, and Markdown documents into static website assets during the build process.

Cloudflare hosts the generated assets and delivers them to visitors over HTTPS.

This approach minimizes the amount of infrastructure I must operate directly while keeping the source code and content under version control.

### Deployment Architecture

The deployment pipeline follows this process:

1. Website source code is maintained in a GitHub repository.
2. Changes are committed to the production branch.
3. Cloudflare's Git integration detects repository updates.
4. Cloudflare retrieves the source files.
5. The build environment installs project dependencies.
6. Astro checks and builds the website.
7. Wrangler deploys the generated static assets.
8. Cloudflare serves the updated website through its public hosting infrastructure.

The production branch is `main`.

The build command is `npm run build`, which executes the project's configured Astro checks and production build.

The deployment command is `npx wrangler deploy`.

The generated website is stored in the `dist/` directory before deployment.

### Repository Organization

The repository separates website implementation from the content published on individual pages.

| Directory or file | Responsibility |
| --- | --- |
| `src/pages/` | Website pages and URL routes |
| `src/components/` | Reusable interface components |
| `src/layouts/` | Shared page layouts |
| `src/content/` | Markdown-based experience and project documentation |
| `src/consts.ts` | Global website configuration |
| `public/` | Public static assets |
| `astro.config.mjs` | Astro framework configuration |
| `package.json` | Dependencies and build commands |
| `wrangler.jsonc` | Cloudflare deployment configuration |

This organization allows the website's content to be updated independently of most of its presentation and deployment code.

### Domain Architecture

Registered `ivanayalatech.com` through Porkbun as the intended professional portfolio domain.

Added the domain to Cloudflare and changed the authoritative nameservers from the registrar's defaults to Cloudflare-managed nameservers.

Verified that Cloudflare recognized the domain as active.

The initial deployment uses a Cloudflare-provided `workers.dev` hostname.

The custom domain remains to be attached to the Worker and validated.

The intended domain structure includes:

- `ivanayalatech.com` — primary professional portfolio.
- `www.ivanayalatech.com` — future redirect to the primary hostname.
- `lab.ivanayalatech.com` — future self-hosted infrastructure showcase.

The existing private homelab domain remains separate from the professional portfolio.

---

## Implementation

### Repository Creation and Template Customization

Selected Astro Sphere as the foundation for the portfolio because of its support for Markdown-based content, reusable components, and individual project pages.

Created a public GitHub repository derived from the upstream template.

Preserved the template's existing architecture while customizing its content to represent my professional experience and technical projects.

Initial changes included:

- Replacing default branding with my professional identity.
- Updating navigation and homepage content.
- Developing a professional biography.
- Implementing categorized technical skills.
- Replacing sample employment entries with verified experience.
- Creating infrastructure case studies through Markdown content collections.
- Removing unused sample content and deferring blog functionality.

Using an established template reduced frontend development overhead and allowed me to prioritize the infrastructure, deployment, and technical documentation aspects of the project.

### Automated Build and Deployment

Connected the GitHub repository to Cloudflare Workers using Cloudflare's Git integration.

Configured the production deployment workflow using the repository's existing build script and Wrangler.

The Wrangler configuration specifies the Worker application name, compatibility date, and generated static assets directory.

The deployed application uses the `dist/` directory produced by Astro.

Successfully completed the initial automated build and deployment.

Subsequent GitHub commits triggered additional deployments without requiring manual uploads of the generated website.

This established a continuous deployment workflow for changes committed to the production branch.

### Static Website Generation

The website uses Astro's static output model.

During the build, Astro processes page components, layouts, styles, and Markdown content.

The resulting assets can be served without maintaining a dedicated Node.js application server.

Node.js and the project's package dependencies are used in the build environment, while Cloudflare delivers the generated website to visitors.

### Content Management

Implemented professional experience and project documentation using Astro content collections.

Content collections define required metadata through schemas and organize documents into structured groups.

The portfolio uses these collections to display professional experience and technical case studies.

Individual projects are stored in dedicated directories, allowing documentation and supporting media to remain organized together.

This structure supports adapting existing private technical documentation into sanitized public case studies.

### DNS and Registrar Configuration

Purchased the professional domain through Porkbun and connected it to Cloudflare for DNS management.

The initial DNS administration work included:

- Adding the domain to Cloudflare.
- Reviewing existing DNS records.
- Checking the registrar's DNSSEC state.
- Updating authoritative nameservers.
- Verifying successful Cloudflare activation.
- Reviewing records associated with registrar parking and potential email forwarding.

The custom domain has not yet been connected to the deployed Worker.

### Initial Deployment and Functional Testing

Deployed the website to Cloudflare Workers Static Assets and enabled its public production `workers.dev` hostname.

Performed functional testing of the initial template, including:

- Homepage rendering.
- Navigation between website sections.
- Individual content pages.
- Search functionality.
- Light and dark theme switching.
- Public access through an unauthenticated browser session.

Verified that the website rendered correctly over HTTPS.

Additional deployments were used to validate ongoing content customization and the Git-integrated deployment workflow.

---

## Technical Decisions and Trade-offs

### Cloud Hosting versus Self-Hosting

Selected cloud hosting for the initial professional website rather than immediately deploying it on the home virtualization environment.

The primary requirement was reliable public accessibility for employers and recruiters.

Hosting the website through Cloudflare avoids depending on residential internet availability, the local firewall, or the Proxmox host.

It also removes the immediate need to expose a self-hosted application to public internet traffic.

The trade-off is reliance on an external hosting provider for website delivery.

A separate self-hosted showcase remains part of the longer-term architecture.

### Static Site Generation

Selected Astro's static site generation approach because the portfolio primarily consists of professional information, documentation, and project pages.

These pages do not require a continuously running backend application.

Static generation reduces runtime infrastructure requirements and allows content to be delivered directly as prebuilt assets.

The trade-off is that website changes require a new build before visitors can see updated content.

The automated deployment pipeline addresses this requirement.

### Git-Based Deployment

Selected GitHub as the source of truth for the website.

Using version control provides a record of changes and supports restoring previous versions of the source code when necessary.

Cloudflare's Git integration automates deployment when repository changes are committed.

This separates source-code management from public website hosting while connecting them through a repeatable process.

### Markdown-Based Documentation

Selected Markdown content collections to support detailed technical documentation without requiring every project page to be constructed manually.

Markdown allows infrastructure case studies to focus on architecture, troubleshooting, decisions, testing, and results.

It also aligns with my existing documentation workflow, which uses Obsidian for private infrastructure records.

Public documentation is prepared separately from operational notes to avoid exposing unnecessary infrastructure details.

### Browser-Based Development

Used GitHub's browser interface for the initial implementation rather than establishing a local development environment immediately.

This reduced setup requirements and allowed the deployment workflow to be established directly through the cloud platforms.

The trade-off is less convenient local testing and more reliance on automated builds to catch errors.

A local development workflow remains a future improvement.

---

## Troubleshooting and Technical Challenges

### Build Compatibility

The selected Astro Sphere template uses an earlier major version of Astro and associated dependencies.

There was a potential compatibility concern when deploying through a modern Cloudflare build environment.

The initial build successfully installed the project dependencies, completed Astro checks, generated the static site, and deployed the resulting assets.

This demonstrated that the selected dependency versions could build in the tested environment.

It does not establish that every dependency is current or free from security vulnerabilities.

### Markdown Content Deployment

During the addition of an infrastructure case study, an automated build failed.

The available build output showed successful dependency installation and Astro diagnostics with no reported type-checking errors, indicating that the failure occurred later in the process.

I reviewed the new Markdown content and its required frontmatter structure.

The project subsequently deployed successfully.

The exact root cause of the earlier failed build was not conclusively established from the available log excerpt.

**Lesson:** Build logs should be examined by stage. Successful dependency installation and type checking do not necessarily guarantee successful static page generation or deployment.

### Content Collection Validation

Astro content collections require documents to follow a defined metadata schema.

Project entries must provide information such as a title, summary, publication date, and technology tags.

This introduced a structured validation requirement for content that would otherwise be ordinary Markdown.

Using consistent frontmatter and project directories helped maintain a repeatable publishing workflow.

### Preserving Existing Website Functionality

Customizing the template required distinguishing reusable interface components, global configuration values, and individual page content.

Changing a global configuration value could update several areas of the website, while page-specific content required editing the corresponding Astro file.

I made and validated early changes incrementally to avoid introducing multiple unrelated problems simultaneously.

Once the deployment and content workflows were understood, I transitioned to completing larger documentation updates in individual commits.

**Lesson:** Incremental changes are useful when establishing unfamiliar infrastructure, while larger changes become practical once the architecture and validation process are understood.

---

## Validation and Testing

### Deployment Validation

Verified that Cloudflare could retrieve the source code, install dependencies, build the website, and deploy generated assets.

Confirmed that the production website became publicly accessible through the assigned Cloudflare hostname.

### Continuous Deployment Validation

Committed website configuration and content changes through GitHub.

Verified that Cloudflare detected the changes and initiated subsequent deployments.

Confirmed that successfully deployed changes appeared on the public website.

This demonstrated a functional automated build and deployment workflow.

### Functional Website Validation

Performed manual testing of the website's primary functions:

- Homepage rendering and navigation.
- Professional experience pages.
- Technical project listings and individual pages.
- Search and filtering.
- Theme switching.
- Public access without authentication.

Additional changes were validated after deployment to confirm that content rendered as intended.

### Responsive Interface Validation

Tested the website through different browser viewport sizes.

Confirmed that the navigation adapted to narrower layouts using the existing responsive menu functionality.

A comprehensive final mobile-device and accessibility review remains pending.

### HTTPS Validation

Confirmed that the deployed `workers.dev` website was accessible over HTTPS.

Custom-domain HTTPS behavior remains to be verified after the professional domain is attached.

---

## Results and Outcomes

### Operational Cloud Deployment

Successfully deployed a publicly accessible professional portfolio using GitHub, Astro, and Cloudflare Workers Static Assets.

Established an automated deployment pipeline that removes the need to manually transfer generated website files.

### Version-Controlled Documentation

Created a structured system for maintaining professional experience and technical project documentation.

Implemented individual Markdown case studies using reusable layouts and validated metadata.

### Reduced Infrastructure Dependency

Separated professional website availability from the home virtualization and networking environment.

The cloud-hosted website does not depend on the local Proxmox host being online to serve its static content.

### Demonstrated Technical Competencies

The project provides practical experience with:

- Git and GitHub repository management.
- CI/CD concepts and automated deployment.
- Static site generation.
- Cloud hosting infrastructure.
- Build configuration and troubleshooting.
- Node.js package management.
- Domain registration and DNS administration.
- HTTPS validation.
- Web configuration and content management.
- Public infrastructure security planning.

---

## Known Limitations and Future Improvements

### Production Domain Configuration

The website currently uses a Cloudflare-provided deployment hostname.

**Planned improvement:** Connect `ivanayalatech.com`, configure the desired `www` redirect, and verify DNS resolution and HTTPS behavior on the production domain.

### DNSSEC

The registrar's DNSSEC settings were checked during domain onboarding.

Cloudflare DNSSEC has not yet been activated and verified.

**Planned improvement:** Configure DNSSEC where supported and verify the appropriate delegation and DNS records.

### Dependency Maintenance

The website uses an existing open-source template with dependencies that require ongoing maintenance.

**Planned improvement:** Review dependencies for known vulnerabilities, remove unused packages where appropriate, and evaluate framework upgrades through controlled testing.

### Production Content Review

Final content, template metadata, social links, licensing requirements, and site configuration must be reviewed before treating the professional website as fully published.

**Planned improvement:** Complete an accuracy, security, accessibility, and branding review.

### Local Development Workflow

Initial development was performed using the GitHub browser interface.

**Planned improvement:** Establish local Git and Astro development tools for testing and reviewing changes before deployment.

### Hybrid Cloud and Self-Hosted Infrastructure

The planned self-hosted infrastructure showcase has not yet been deployed.

**Planned improvement:** Build a dedicated virtual machine or containerized hosting environment, configure reverse proxy infrastructure, validate network segmentation, and evaluate secure Cloudflare Tunnel connectivity.

This environment will remain separate from the primary cloud-hosted professional portfolio.

---

## Lessons Learned

### Infrastructure Complexity Should Match Requirements

A professional information website does not necessarily require a dedicated application server or self-managed reverse proxy.

Using static hosting met the immediate requirement while reducing infrastructure maintenance and public exposure.

### Automation Improves Repeatability

Automated builds and deployments make the publication process more consistent.

A Git commit can serve as the starting point for a reproducible deployment without requiring manual file transfers.

### Version Control Supports Safe Iteration

Maintaining source code in GitHub provides a history of configuration and content changes.

This makes troubleshooting and reviewing modifications easier than editing files directly on a production server.

### Build Success and Functional Validation Are Different

A deployment can complete successfully while the resulting website still contains broken links, incorrect content, or layout problems.

Functional testing must complement build validation.

### Separating Public and Private Documentation Matters

Operational infrastructure documentation may contain information that should not be exposed publicly.

Publishing sanitized technical case studies allows engineering decisions and accomplishments to be demonstrated without unnecessarily disclosing sensitive implementation details.

### Cloud and Self-Hosted Infrastructure Serve Different Purposes

Cloud hosting provides an appropriate foundation for the public professional website.

Self-hosted infrastructure provides opportunities for deeper systems administration, networking, and security experimentation.

The hybrid approach allows each environment to serve the requirements best suited to it.

---

## Project Summary

This project established a functional cloud-hosted professional portfolio with automated builds and deployments.

The implementation combined GitHub source control, Astro static site generation, Cloudflare Workers hosting, Markdown content management, and DNS administration.

The resulting website is publicly accessible through a Cloudflare-provided HTTPS hostname and can be updated through commits to the connected repository.

The project demonstrates practical skills in cloud infrastructure, deployment automation, source control, web configuration, troubleshooting, and technical documentation.

Future work will finalize the professional domain, complete the production security and content review, and establish a separate self-hosted infrastructure showcase.
