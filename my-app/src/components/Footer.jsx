import { contacts, newTab, profile } from "../data/profile";

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm">
        <div className="flex flex-col gap-1">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="text-muted">{profile.location}</p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                {...(contact.external ? newTab : {})}
                className="link"
              >
                {contact.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="link">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
