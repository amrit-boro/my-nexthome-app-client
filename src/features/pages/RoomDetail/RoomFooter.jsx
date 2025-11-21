function RoomFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Solutions", links: ["Marketing", "Analytics"] },
            { title: "Support", links: ["Pricing", "Documentation"] },
            { title: "Company", links: ["About", "Blog"] },
            { title: "Legal", links: ["Claim", "Privacy"] },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-base text-gray-500">
            © 2024 PG Finder, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default RoomFooter;
