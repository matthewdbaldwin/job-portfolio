import hero from "./hero.js";

const findLink = (id) => hero.socialLinks.find((link) => (link.id || "").toLowerCase() === id);

const contact = {
  headline: "Let’s Connect",
  message:
    "Let’s talk about how I can strengthen your marketing ops & brand strategy.",
  links: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: findLink("linkedin")?.url ?? "https://www.linkedin.com/in/mattdbaldwin/",
    },
    {
      id: "github",
      label: "GitHub",
      url: findLink("github")?.url ?? "https://github.com/matthewdbaldwin",
    },
    {
      id: "email",
      label: "Email Me",
      url: `mailto:${hero.email}`,
    },
  ],
};

export default contact;
