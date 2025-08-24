import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border py-4">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Created by{" "}
          <Link
            href="https://lucasco.dev"
            target="_blank"
            className="text-blue-500 font-medium hover:underline"
          >
            lucasco.dev
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
