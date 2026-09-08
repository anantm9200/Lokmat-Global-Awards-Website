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
    label: "GloCon",
    href: "/glocon",
    items: [
      { label: "GloCon Overview", href: "/glocon" },
      { label: "Global Economic Convention (LGEC)", href: "/lgec" },
      { label: "One World Summit & Awards (LOWS)", href: "/lows" }
    ]
  },
  {
    label: "LMOTY",
    href: "https://lokmatmaharashtrian.com/",
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
