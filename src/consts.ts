import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Ivan Ayala",
  DESCRIPTION: "Professional IT portfolio featuring technical support, network administration, independent IT consulting, and infrastructure engineering projects.",
  AUTHOR: "Ivan Ayala",
}

// Work Page
export const WORK: Page = {
  TITLE: "Experience",
  DESCRIPTION: "Professional experience in IT, networking, hardware troubleshooting, and infrastructure support.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Technical case studies covering networking, virtualization, cloud infrastructure, and systems administration.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Experience", 
    HREF: "/work", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "ivanayala205@gmail.com",
    HREF: "mailto:ivanayala205@gmail.com",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "DinoSecurityIA",
    HREF: "https://github.com/DinoSecurityIA",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "ivan-ayala07",
    HREF: "https://www.linkedin.com/in/ivan-ayala07/",
  },
]

