export const portfolioData = {
  personalInfo: {
    name: "Vivek Badoni",
    role: "Full-Stack Developer (Python / Flask / React)",
    phone: "+91 9690384930",
    email: "badonivivek2006@gmail.com",
    location: "Dehradun, Uttarakhand, India",
    status: "Open for Full-Stack / Software Developer Roles & Internships",
    taglines: [
      "Full-Stack Developer (Python / Flask / React)",
      "PHP & Laravel Web Application Engineer",
      "Building ATS & Database-Driven Applications",
      "Creative 3D WebGL & Modern Frontend UI"
    ],
    bio: "B.Sc. Information Technology student (2026) with hands-on experience across Python, Flask, PHP, and React through two internships and multiple full-stack projects. Skilled at building complete web applications end-to-end — frontend UI, backend logic, database design, and authentication. Currently working as a Full-Stack Developer Intern, contributing to both frontend and backend of live production features.",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/Vivek-Badoni",
        icon: "github"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vivek-badoni",
        icon: "linkedin"
      }
    ]
  },

  stats: [
    {
      label: "Internships Completed",
      value: "2+",
      color: "#00f3ff"
    },
    {
      label: "Full-Stack Projects",
      value: "5+",
      color: "#9d4edd"
    },
    {
      label: "Core Languages",
      value: "Java, Python, C++, PHP",
      color: "#00ff9d"
    },
    {
      label: "Graduation (B.Sc. IT)",
      value: "May 2026",
      color: "#ffb703"
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 88 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS & Bootstrap", level: 90 },
      { name: "jQuery & Responsive Design", level: 88 }
    ],

    backend: [
      { name: "Python & Flask", level: 90 },
      { name: "PHP & Laravel", level: 92 },
      { name: "RESTful APIs & MVC Architecture", level: 88 },
      { name: "Eloquent ORM", level: 86 }
    ],

    databases: [
      { name: "MySQL", level: 90 },
      { name: "SQLite", level: 88 },
      { name: "MS SQL Server", level: 80 },
      { name: "Database Design & CRUD", level: 92 }
    ],

    tools: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code & IntelliJ", level: 92 },
      { name: "Chart.js & ReportLab", level: 85 },
      { name: "Postman & Linux CLI", level: 84 }
    ]
  },

  experience: [
    {
      period: "Ongoing",
      role: "Full-Stack Developer Intern",
      company: "Tulyarth Pvt. Ltd.",
      bullets: [
        "Working on both frontend and backend for a live production web application — building UI with HTML, CSS, JavaScript, and React, and developing backend logic and functionality.",
        "Collaborating with a cross-functional development team on full-stack feature delivery, debugging, and code reviews."
      ],
      description: "Contributing to live production features across frontend React/JavaScript and backend architecture, optimizing code quality and UI performance."
    },
    {
      period: "Jun – Aug 2025",
      role: "Full-Stack Web Development Intern",
      company: "Ensino Research and Development Pvt. Ltd.",
      bullets: [
        "Built a full-stack web application in Flask with database-backed backend logic across multiple modules (auth, dashboard, CRUD).",
        "Implemented secure login with password hashing and session-based authentication, protecting all user-facing routes."
      ],
      description: "Designed secure Flask modules, authentication pipelines, session control, and database-backed dashboards."
    },
    {
      period: "Jun – Jul 2024",
      role: "Core Python Intern",
      company: "Ensino Research and Development Pvt. Ltd.",
      bullets: [
        "Developed multiple Python automation scripts for data handling tasks, cutting down repetitive manual processing."
      ],
      description: "Built automated data processing scripts in Python, streamlining workflow efficiency."
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
      institution: "Uttaranchal University, Dehradun, Uttarakhand",
      period: "Aug 2023 – May 2026"
    },
    {
      degree: "Senior Secondary (Class XII)",
      institution: "CBSE Board",
      period: "2023"
    },
    {
      degree: "High School (Class X)",
      institution: "CBSE Board",
      period: "2021"
    }
  ],

  certifications: [
    {
      name: "Core Python",
      issuer: "Ensino Research and Development Pvt. Ltd."
    },
    {
      name: "Full-Stack Web Development using Python",
      issuer: "Ensino Research and Development Pvt. Ltd."
    },
    {
      name: "AWS Cloud Computing",
      issuer: "Coplur Workshop"
    },
    {
      name: "ChatGPT for Everyone",
      issuer: "GUVI"
    },
    {
      name: "Roadmap for Patent Writing",
      issuer: "NPTEL"
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "AI-Powered Resume Analyzer & ATS Scoring System",
      category: "AI & Python",
      subtitle: "Full-stack ATS scoring engine with analytics dashboard and automated PDF report generation.",
      description: "Built a full-stack ATS scoring engine in Python and Flask that evaluates resumes across 6+ core sections and matches skills against multiple job roles. Designed an admin analytics dashboard with 4+ chart types (role distribution, skill gaps, score trends) using Chart.js. Automated PDF report generation and CSV export with ReportLab.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      tags: ["Python", "Flask", "SQLite", "Chart.js", "ReportLab", "ATS Engine"],
      demoUrl: "https://github.com/Vivek-Badoni",
      githubUrl: "https://github.com/Vivek-Badoni",
      featured: true
    },
    {
      id: "proj-2",
      title: "Laravel Login & Registration System",
      category: "Laravel & PHP",
      subtitle: "Complete authentication module built with Laravel MVC architecture & Eloquent ORM.",
      description: "Built a complete authentication module in Laravel featuring registration, login, logout, and protected dashboard routes. Secured the application with CSRF protection, bcrypt password hashing, form validation, and middleware route guards. Designed reusable Blade template views.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      tags: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Security"],
      demoUrl: "https://github.com/Vivek-Badoni",
      githubUrl: "https://github.com/Vivek-Badoni",
      featured: true
    },
    {
      id: "proj-3",
      title: "Student Registration System",
      category: "PHP & MySQL",
      subtitle: "Web-based system for managing student records with full CRUD operations.",
      description: "Developed a database-backed web application to register, search, update, and manage student records with full CRUD functionality connected to a MySQL database.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "CRUD"],
      demoUrl: "https://github.com/Vivek-Badoni",
      githubUrl: "https://github.com/Vivek-Badoni",
      featured: true
    },
    {
      id: "proj-4",
      title: "Voice Desktop Assistant",
      category: "Python & AI",
      subtitle: "Voice-controlled desktop assistant executing speech-to-text automation tasks.",
      description: "Built a Python-driven speech recognition application that converts spoken voice commands into text and executes automated system commands.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
      tags: ["Python", "Speech Recognition", "Voice AI", "Automation"],
      demoUrl: "https://github.com/Vivek-Badoni",
      githubUrl: "https://github.com/Vivek-Badoni",
      featured: false
    },
    {
      id: "proj-5",
      title: "Personal Portfolio Website",
      category: "3D & React",
      subtitle: "Modern, responsive 3D portfolio showcasing full-stack projects and interactive WebGL elements.",
      description: "Designed and deployed a fully responsive personal portfolio site featuring Three.js WebGL rendering, custom audio effects, CLI terminal overlay, and dynamic theme switching.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      tags: ["HTML5", "CSS3", "JavaScript", "React", "Three.js", "WebGL"],
      demoUrl: "https://github.com/Vivek-Badoni",
      githubUrl: "https://github.com/Vivek-Badoni",
      featured: false
    }
  ]
};