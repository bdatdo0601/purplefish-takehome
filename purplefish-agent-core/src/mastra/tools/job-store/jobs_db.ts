export interface JobPosition {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salaryRange: {
    lessThan: number;
    greaterThan: number;
  };
  jobRequirements: {
    niceToHave: string[];
    mustHave: string[];
  };
}

export const jobs: JobPosition[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    description:
      "Join our engineering team to develop and maintain large-scale software applications that serve billions of users worldwide. You'll work on cutting-edge technologies, collaborate with cross-functional teams, and contribute to products that shape the future of technology. Responsibilities include designing system architecture, writing clean and efficient code, conducting code reviews, and mentoring junior developers.",
    location: "San Francisco, CA",
    salaryRange: {
      lessThan: 150000,
      greaterThan: 100000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with React and Node.js",
        "Experience with AWS and Docker",
        "Knowledge of microservices architecture",
        "Open source contributions",
      ],
      mustHave: [
        "Bachelor's degree in Computer Science",
        "Proficiency in JavaScript and TypeScript",
        "3+ years of software development experience",
      ],
    },
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    description:
      "Analyze and interpret complex data sets to drive business insights and strategic decision-making. Work with machine learning algorithms, statistical models, and big data technologies to solve challenging problems across various Amazon business units. You'll collaborate with product managers, engineers, and business stakeholders to translate data into actionable recommendations that impact millions of customers.",
    location: "New York, NY",
    salaryRange: {
      lessThan: 180000,
      greaterThan: 120000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with machine learning and data visualization",
        "Experience with AWS and Docker",
        "Knowledge of deep learning frameworks",
        "Publication in peer-reviewed journals",
      ],
      mustHave: [
        "Master's degree in Statistics or related field",
        "Proficiency in Python and SQL",
        "Experience with data analysis tools",
      ],
    },
  },
  {
    id: "2",
    title: "Nurse Practitioner",
    company: "Kaiser Permanente",
    description:
      "Provide comprehensive primary care services to patients across all age groups in a collaborative healthcare environment. Conduct physical examinations, diagnose and treat acute and chronic conditions, prescribe medications, and develop treatment plans. Work closely with physicians, specialists, and healthcare teams to ensure optimal patient outcomes while maintaining the highest standards of medical care.",
    location: "Seattle, WA",
    salaryRange: {
      lessThan: 160000,
      greaterThan: 110000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with patient care and medical procedures",
        "Specialization in family medicine or internal medicine",
        "Experience with electronic health records",
      ],
      mustHave: [
        "Master's degree in Nursing",
        "Certification as a Registered Nurse",
        "Nurse Practitioner license",
      ],
    },
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Microsoft",
    description:
      "Lead product strategy and execution for consumer-facing applications used by millions of users globally. Define product roadmaps, gather and prioritize requirements from stakeholders, and work closely with engineering, design, and marketing teams to deliver innovative solutions. Conduct market research, analyze user feedback, and make data-driven decisions to drive product growth and user engagement.",
    location: "Redmond, WA",
    salaryRange: {
      lessThan: 170000,
      greaterThan: 120000,
    },
    jobRequirements: {
      niceToHave: [
        "MBA or advanced degree",
        "Experience with Agile methodology",
        "Technical background in software development",
        "Experience with A/B testing and analytics",
      ],
      mustHave: [
        "Bachelor's degree in Business, Engineering, or related field",
        "5+ years of product management experience",
        "Strong analytical and communication skills",
      ],
    },
  },
  {
    id: "2118234",
    title: "DevOps Engineer",
    company: "Netflix",
    description:
      "Build and maintain scalable infrastructure that supports Netflix's global streaming platform serving over 200M subscribers. Design and implement CI/CD pipelines, automate deployment processes, monitor system performance, and ensure high availability of services. Collaborate with development teams to optimize application performance and implement best practices for cloud infrastructure management.",
    location: "Los Angeles, CA",
    salaryRange: {
      lessThan: 165000,
      greaterThan: 115000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with Kubernetes and container orchestration",
        "Knowledge of monitoring tools like Grafana and Prometheus",
        "Experience with infrastructure as code",
        "AWS or GCP certifications",
      ],
      mustHave: [
        "Bachelor's degree in Computer Science or Engineering",
        "Experience with AWS, Docker, and Jenkins",
        "Proficiency in Python or Bash scripting",
      ],
    },
  },
  {
    id: "1q209847",
    title: "UX Designer",
    company: "Apple",
    description:
      "Create intuitive and beautiful user experiences for Apple's ecosystem of products and services. Conduct user research, create wireframes and prototypes, collaborate with cross-functional teams, and ensure design consistency across platforms. You'll be responsible for translating complex user needs into elegant design solutions that align with Apple's design principles and brand standards.",
    location: "Cupertino, CA",
    salaryRange: {
      lessThan: 155000,
      greaterThan: 105000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with iOS and macOS design guidelines",
        "Knowledge of accessibility standards",
        "Experience with design systems",
        "Portfolio of mobile and web design work",
      ],
      mustHave: [
        "Bachelor's degree in Design, HCI, or related field",
        "Proficiency in Sketch, Figma, and Adobe Creative Suite",
        "4+ years of UX design experience",
      ],
    },
  },
  {
    id: "10274",
    title: "Financial Analyst",
    company: "Goldman Sachs",
    description:
      "Provide financial analysis and strategic insights to support investment decisions and business operations. Build complex financial models, prepare detailed reports and presentations, conduct market research, and collaborate with senior leadership on strategic initiatives. You'll analyze financial data, identify trends and opportunities, and present recommendations to drive business growth and profitability.",
    location: "New York, NY",
    salaryRange: {
      lessThan: 140000,
      greaterThan: 90000,
    },
    jobRequirements: {
      niceToHave: [
        "CFA or CPA certification",
        "Experience with Bloomberg Terminal",
        "Knowledge of derivatives and fixed income",
        "Previous investment banking experience",
      ],
      mustHave: [
        "Bachelor's degree in Finance, Economics, or related field",
        "Proficiency in Excel and financial modeling",
        "Strong analytical and quantitative skills",
      ],
    },
  },
  {
    id: "92012",
    title: "Marketing Manager",
    company: "Coca-Cola",
    description:
      "Develop and execute comprehensive marketing strategies to drive brand awareness and customer engagement across multiple channels. Lead cross-functional teams to create compelling marketing campaigns, manage brand positioning, analyze market trends, and optimize marketing spend. Collaborate with creative agencies, oversee digital marketing initiatives, and measure campaign effectiveness to ensure ROI objectives are met.",
    location: "Atlanta, GA",
    salaryRange: {
      lessThan: 125000,
      greaterThan: 85000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with digital marketing platforms",
        "Knowledge of consumer behavior and market research",
        "Brand management experience",
        "Experience with marketing automation tools",
      ],
      mustHave: [
        "Bachelor's degree in Marketing, Business, or Communications",
        "5+ years of marketing experience",
        "Strong project management and communication skills",
      ],
    },
  },
  {
    id: "1294",
    title: "Mechanical Engineer",
    company: "Tesla",
    description:
      "Design and develop innovative mechanical systems for electric vehicles and energy storage products. Work on cutting-edge automotive technology, from battery systems to manufacturing processes. Collaborate with multidisciplinary teams to solve complex engineering challenges, conduct testing and validation, and ensure products meet safety and performance standards while pushing the boundaries of sustainable transportation.",
    location: "Austin, TX",
    salaryRange: {
      lessThan: 145000,
      greaterThan: 95000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with automotive industry standards",
        "Knowledge of CAD software and simulation tools",
        "Experience with manufacturing processes",
        "Electric vehicle or battery technology experience",
      ],
      mustHave: [
        "Bachelor's degree in Mechanical Engineering",
        "Proficiency in SolidWorks or similar CAD software",
        "3+ years of mechanical design experience",
      ],
    },
  },
  {
    id: "71894512",
    title: "Cybersecurity Analyst",
    company: "IBM",
    description:
      "Protect organizational assets by monitoring, detecting, and responding to cybersecurity threats. Implement security protocols, conduct vulnerability assessments, analyze security incidents, and develop incident response procedures. Work with cutting-edge security tools and technologies to identify potential threats, investigate security breaches, and ensure compliance with industry regulations and standards.",
    location: "Austin, TX",
    salaryRange: {
      lessThan: 135000,
      greaterThan: 85000,
    },
    jobRequirements: {
      niceToHave: [
        "CISSP, CISM, or other security certifications",
        "Experience with SIEM tools and threat intelligence",
        "Knowledge of penetration testing",
        "Experience with cloud security",
      ],
      mustHave: [
        "Bachelor's degree in Cybersecurity, IT, or related field",
        "Understanding of network security and protocols",
        "Experience with security tools and incident response",
      ],
    },
  },
  {
    id: "182947",
    title: "Sales Representative",
    company: "Salesforce",
    description:
      "Drive revenue growth by identifying, qualifying, and closing new business opportunities in the enterprise software market. Build and maintain relationships with key decision-makers, understand customer needs, and present tailored solutions that address business challenges. Manage the entire sales cycle from prospecting to contract negotiation while consistently exceeding sales targets and contributing to team success.",
    location: "Chicago, IL",
    salaryRange: {
      lessThan: 120000,
      greaterThan: 70000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with CRM software and sales tools",
        "Knowledge of SaaS and cloud computing",
        "Previous enterprise sales experience",
        "Industry certifications or training",
      ],
      mustHave: [
        "Bachelor's degree in Business, Marketing, or related field",
        "2+ years of B2B sales experience",
        "Strong communication and negotiation skills",
      ],
    },
  },
  {
    id: "1824907",
    title: "Operations Manager",
    company: "FedEx",
    description:
      "Oversee daily operations of logistics and distribution centers to ensure efficient package processing and delivery. Manage teams of warehouse staff, implement process improvements, monitor key performance indicators, and ensure compliance with safety regulations. Coordinate with transportation teams, optimize routing and scheduling, and maintain high standards of customer service while meeting operational targets and cost objectives.",
    location: "Memphis, TN",
    salaryRange: {
      lessThan: 110000,
      greaterThan: 75000,
    },
    jobRequirements: {
      niceToHave: [
        "Lean Six Sigma certification",
        "Experience with warehouse management systems",
        "Knowledge of supply chain optimization",
        "Experience in logistics or transportation",
      ],
      mustHave: [
        "Bachelor's degree in Operations, Business, or related field",
        "5+ years of operations management experience",
        "Strong leadership and problem-solving skills",
      ],
    },
  },
];
