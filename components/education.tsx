export function Education() {
  const education = [
    {
      degree: "Class 12th",
      school: "Shevgaon English Medium School & Jr. College",
      // school: "College",
      graduation: "2025—Present",
      // details: "Relevant coursework in cybersecurity, networks, and systems.",
    },
    {
      degree: "Class 10th",
      school: "Dr. Balasaheb Vikhe Patil CBSE School",
      // school: "College",
      graduation: "2023—2024",
      // details: "Relevant coursework in cybersecurity, networks, and systems.",
    },
  ];

  return (
    <section id="education" className="py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="border-l-2 border-foreground/30 pl-6 pb-1"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {edu.graduation}
                </span>
              </div>
              {/* <p className="text-muted-foreground">{edu.details}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
