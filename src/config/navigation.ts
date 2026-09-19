export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavMenu {
  label: string;
  href?: string;
  isExternal?: boolean;
  items?: NavLink[];
}

export const navigationData: NavMenu[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Our Initiatives",
    items: [
      { label: "Global Economic Convention", href: "/lgec" },
      { label: "One World Summit & Awards", href: "/lowsa" }
    ]
  },
  {
    label: "LMOTY",
    href: "https://lokmatmaharashtrian.com/",
    isExternal: true
  },
  {
    label: "LMS",
    href: "https://lokmatmoststylish.com/",
    isExternal: true
  },
  {
    label: "Gallery",
    href: "/gallery"
  },
  {
    label: "Our Partners",
    href: "/partners"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];
