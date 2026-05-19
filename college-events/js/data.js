/* ============================================
   MOCK DATA — Fake API Data
   College Event Management System
   ============================================ */

const MockData = {
  /* ---- Users ---- */
  users: [
    { id: 1, name: "Abhijeet Sharma", email: "abhijeet@college.edu", avatar: null, initials: "AS", department: "Computer Science", year: "3rd Year", role: "student", phone: "+91 98765 43210", skills: ["JavaScript", "Python", "UI/UX Design", "React"], bio: "Passionate about building digital experiences and solving real-world problems through technology.", registeredEvents: [1, 3, 5, 7], certificates: [1, 2, 3], achievements: ["Early Bird", "Event Champion", "Community Star"] },
    { id: 2, name: "Priya Patel", email: "priya@college.edu", avatar: null, initials: "PP", department: "Electronics", year: "2nd Year", role: "student", registeredEvents: [2, 4], certificates: [1], achievements: ["First Step"] },
    { id: 3, name: "Admin User", email: "admin@college.edu", avatar: null, initials: "AD", department: "Administration", year: "", role: "admin" }
  ],

  /* ---- Events ---- */
  events: [
    {
      id: 1, title: "TechFest 2026", subtitle: "Annual Technology Festival",
      description: "Join the biggest tech festival of the year featuring workshops, hackathons, keynote speeches, and networking opportunities. Connect with industry leaders, showcase your projects, and win exciting prizes. This year's theme focuses on AI and sustainable technology.",
      category: "Technology", department: "Computer Science",
      date: "2026-06-15", endDate: "2026-06-17", time: "09:00 AM",
      venue: "Main Auditorium, Block A", organizer: "Tech Club",
      price: 0, isFree: true, totalSeats: 500, seatsLeft: 127,
      status: "upcoming", featured: true,
      banner: null, bannerGradient: "linear-gradient(135deg, #6C5CE7, #A29BFE)",
      tags: ["hackathon", "workshop", "networking"],
      speakers: [
        { name: "Dr. Rajesh Kumar", role: "AI Researcher, IIT Delhi", topic: "Future of Generative AI" },
        { name: "Sneha Agarwal", role: "CTO, TechStartup Inc", topic: "Building Scalable Systems" }
      ],
      schedule: [
        { day: "Day 1", events: [
          { time: "09:00 AM", title: "Inauguration Ceremony", duration: "1 hr" },
          { time: "10:30 AM", title: "Keynote: Future of AI", duration: "1.5 hrs" },
          { time: "01:00 PM", title: "Hackathon Kickoff", duration: "6 hrs" },
          { time: "07:00 PM", title: "Networking Dinner", duration: "2 hrs" }
        ]},
        { day: "Day 2", events: [
          { time: "09:00 AM", title: "Workshop: Cloud Computing", duration: "3 hrs" },
          { time: "01:00 PM", title: "Panel Discussion", duration: "2 hrs" },
          { time: "04:00 PM", title: "Project Demos", duration: "3 hrs" }
        ]},
        { day: "Day 3", events: [
          { time: "09:00 AM", title: "Final Presentations", duration: "3 hrs" },
          { time: "01:00 PM", title: "Award Ceremony", duration: "2 hrs" },
          { time: "04:00 PM", title: "Closing Ceremony", duration: "1 hr" }
        ]}
      ],
      faqs: [
        { q: "Who can participate?", a: "All college students from any department can participate. External participants need prior registration." },
        { q: "Is there a registration fee?", a: "No, the event is completely free for all college students." },
        { q: "What should I bring?", a: "Bring your laptop, student ID, and lots of enthusiasm!" },
        { q: "Will certificates be provided?", a: "Yes, all participants will receive digital certificates of participation." }
      ]
    },
    {
      id: 2, title: "Cultural Night", subtitle: "Annual Cultural Extravaganza",
      description: "An evening of music, dance, drama, and art celebrating the diverse cultural heritage of our college community. Featuring performances from all departments and guest artists.",
      category: "Cultural", department: "Fine Arts",
      date: "2026-06-22", endDate: "2026-06-22", time: "06:00 PM",
      venue: "Open Air Theatre", organizer: "Cultural Committee",
      price: 100, isFree: false, totalSeats: 1000, seatsLeft: 342,
      status: "upcoming", featured: true,
      banner: null, bannerGradient: "linear-gradient(135deg, #FD79A8, #FDCB6E)",
      tags: ["music", "dance", "arts"],
      speakers: [
        { name: "Arijit Singh", role: "Playback Singer", topic: "Live Performance" }
      ],
      schedule: [
        { day: "Evening", events: [
          { time: "06:00 PM", title: "Red Carpet & Welcome", duration: "30 min" },
          { time: "06:30 PM", title: "Classical Dance Performances", duration: "1 hr" },
          { time: "07:30 PM", title: "Band Performance", duration: "1 hr" },
          { time: "08:30 PM", title: "Guest Artist Show", duration: "1.5 hrs" },
          { time: "10:00 PM", title: "DJ Night", duration: "2 hrs" }
        ]}
      ],
      faqs: [
        { q: "Is there a dress code?", a: "Yes, the theme is 'Ethnic Fusion'. Traditional or fusion wear is encouraged." },
        { q: "Can I bring guests?", a: "Each student can bring one guest with a guest pass purchased at ₹200." }
      ]
    },
    {
      id: 3, title: "AI/ML Workshop", subtitle: "Hands-on Machine Learning",
      description: "A comprehensive 2-day workshop covering machine learning fundamentals, neural networks, and practical applications using Python and TensorFlow. Perfect for beginners and intermediate learners.",
      category: "Workshop", department: "Computer Science",
      date: "2026-07-05", endDate: "2026-07-06", time: "10:00 AM",
      venue: "Computer Lab 301, Block C", organizer: "AI Club",
      price: 200, isFree: false, totalSeats: 60, seatsLeft: 8,
      status: "upcoming", featured: true,
      banner: null, bannerGradient: "linear-gradient(135deg, #00CEC9, #81ECEC)",
      tags: ["AI", "machine learning", "python", "hands-on"],
      speakers: [
        { name: "Prof. Anita Desai", role: "ML Lead, Google India", topic: "Practical ML Applications" }
      ],
      schedule: [
        { day: "Day 1", events: [
          { time: "10:00 AM", title: "Python Refresher & Setup", duration: "2 hrs" },
          { time: "01:00 PM", title: "ML Fundamentals", duration: "3 hrs" }
        ]},
        { day: "Day 2", events: [
          { time: "10:00 AM", title: "Neural Networks Deep Dive", duration: "3 hrs" },
          { time: "02:00 PM", title: "Build Your Own Model", duration: "3 hrs" }
        ]}
      ],
      faqs: [
        { q: "Do I need prior ML experience?", a: "Basic Python knowledge is sufficient. We'll cover ML from scratch." },
        { q: "Will laptops be provided?", a: "No, please bring your own laptop with Python 3.8+ installed." }
      ]
    },
    {
      id: 4, title: "Sports Meet 2026", subtitle: "Inter-Department Championship",
      description: "The annual sports championship featuring cricket, football, basketball, badminton, athletics, and more. Show your sporting spirit and compete for the championship trophy!",
      category: "Sports", department: "Physical Education",
      date: "2026-07-20", endDate: "2026-07-25", time: "07:00 AM",
      venue: "College Sports Complex", organizer: "Sports Committee",
      price: 0, isFree: true, totalSeats: 2000, seatsLeft: 985,
      status: "upcoming", featured: false,
      banner: null, bannerGradient: "linear-gradient(135deg, #E17055, #FDCB6E)",
      tags: ["cricket", "football", "athletics"],
      speakers: [],
      schedule: [],
      faqs: [
        { q: "Can I participate in multiple sports?", a: "Yes, as long as the schedules don't overlap." }
      ]
    },
    {
      id: 5, title: "Startup Weekend", subtitle: "48-Hour Entrepreneurship Challenge",
      description: "Turn your idea into a startup in just 48 hours! Network with mentors, form teams, validate ideas, and pitch to real investors. The best ideas win seed funding and incubation support.",
      category: "Entrepreneurship", department: "Business Studies",
      date: "2026-08-10", endDate: "2026-08-12", time: "06:00 PM",
      venue: "Innovation Hub, Block D", organizer: "E-Cell",
      price: 300, isFree: false, totalSeats: 120, seatsLeft: 45,
      status: "upcoming", featured: true,
      banner: null, bannerGradient: "linear-gradient(135deg, #6C5CE7, #FD79A8)",
      tags: ["startup", "pitch", "innovation"],
      speakers: [
        { name: "Vikram Mehta", role: "Angel Investor", topic: "What Investors Look For" },
        { name: "Riya Sharma", role: "Founder, EduTech Co", topic: "From Idea to IPO" }
      ],
      schedule: [],
      faqs: [
        { q: "Do I need a team?", a: "You can come with a team or form one during the event." }
      ]
    },
    {
      id: 6, title: "Design Thinking Bootcamp", subtitle: "UX/UI Design Intensive",
      description: "An immersive bootcamp on design thinking methodology, user research, wireframing, and prototyping. Learn industry-standard tools like Figma and create a complete design project.",
      category: "Workshop", department: "Design",
      date: "2026-08-20", endDate: "2026-08-21", time: "10:00 AM",
      venue: "Design Studio, Block B", organizer: "Design Club",
      price: 150, isFree: false, totalSeats: 40, seatsLeft: 22,
      status: "upcoming", featured: false,
      banner: null, bannerGradient: "linear-gradient(135deg, #A29BFE, #FD79A8)",
      tags: ["design", "UX", "figma"],
      speakers: [],
      schedule: [],
      faqs: []
    },
    {
      id: 7, title: "Photography Exhibition", subtitle: "Lens & Light",
      description: "Showcasing the best photography work from students across all departments. Submit your entries and get a chance to win prizes and have your work displayed in the college gallery.",
      category: "Cultural", department: "Fine Arts",
      date: "2026-09-01", endDate: "2026-09-03", time: "11:00 AM",
      venue: "Art Gallery, Block E", organizer: "Photography Club",
      price: 0, isFree: true, totalSeats: 300, seatsLeft: 200,
      status: "upcoming", featured: false,
      banner: null, bannerGradient: "linear-gradient(135deg, #2D3436, #636E72)",
      tags: ["photography", "exhibition", "art"],
      speakers: [],
      schedule: [],
      faqs: []
    },
    {
      id: 8, title: "Coding Championship", subtitle: "Competitive Programming Contest",
      description: "Test your algorithmic skills in this intense coding competition. Solve challenging problems across multiple rounds and prove your programming prowess. Open to all skill levels.",
      category: "Technology", department: "Computer Science",
      date: "2026-09-15", endDate: "2026-09-15", time: "10:00 AM",
      venue: "Computer Lab 201, Block C", organizer: "Coding Club",
      price: 0, isFree: true, totalSeats: 100, seatsLeft: 33,
      status: "upcoming", featured: true,
      banner: null, bannerGradient: "linear-gradient(135deg, #00CEC9, #6C5CE7)",
      tags: ["coding", "algorithms", "competition"],
      speakers: [],
      schedule: [],
      faqs: []
    }
  ],

  /* ---- Categories ---- */
  categories: [
    { name: "Technology", icon: "💻", count: 12, color: "#6C5CE7" },
    { name: "Cultural", icon: "🎭", count: 8, color: "#FD79A8" },
    { name: "Sports", icon: "⚽", count: 6, color: "#E17055" },
    { name: "Workshop", icon: "🔧", count: 10, color: "#00CEC9" },
    { name: "Entrepreneurship", icon: "🚀", count: 4, color: "#FDCB6E" },
    { name: "Seminar", icon: "🎓", count: 5, color: "#74B9FF" }
  ],

  /* ---- Clubs ---- */
  clubs: [
    { id: 1, name: "Tech Club", members: 245, events: 12, description: "Exploring cutting-edge technology", icon: "💻", color: "#6C5CE7" },
    { id: 2, name: "Cultural Committee", members: 180, events: 8, description: "Celebrating art and culture", icon: "🎭", color: "#FD79A8" },
    { id: 3, name: "AI Club", members: 120, events: 6, description: "Artificial Intelligence & ML enthusiasts", icon: "🤖", color: "#00CEC9" },
    { id: 4, name: "E-Cell", members: 95, events: 5, description: "Entrepreneurship and innovation hub", icon: "🚀", color: "#FDCB6E" },
    { id: 5, name: "Photography Club", members: 150, events: 7, description: "Capturing moments through lens", icon: "📸", color: "#636E72" },
    { id: 6, name: "Coding Club", members: 200, events: 10, description: "Competitive programming community", icon: "⌨️", color: "#74B9FF" },
    { id: 7, name: "Design Club", members: 85, events: 4, description: "UI/UX and graphic design", icon: "🎨", color: "#A29BFE" },
    { id: 8, name: "Sports Committee", members: 300, events: 15, description: "All sports activities and tournaments", icon: "🏆", color: "#E17055" }
  ],

  /* ---- Certificates ---- */
  certificates: [
    { id: 1, title: "TechFest 2025 — Participation", event: "TechFest 2025", date: "2025-06-20", type: "participation", credentialId: "TF2025-001-AS" },
    { id: 2, title: "Hackathon Winner — 1st Place", event: "Code Sprint 2025", date: "2025-09-15", type: "achievement", credentialId: "CS2025-W01-AS" },
    { id: 3, title: "AI Workshop — Completion", event: "AI/ML Bootcamp", date: "2025-11-10", type: "completion", credentialId: "AI2025-C42-AS" }
  ],

  /* ---- Testimonials ---- */
  testimonials: [
    { name: "Rahul Verma", department: "CSE, 4th Year", text: "EventHub completely transformed how I discover and participate in college events. The dashboard is incredibly intuitive!", rating: 5 },
    { name: "Ananya Singh", department: "ECE, 3rd Year", text: "I never miss an event anymore! The calendar feature and notifications keep me updated about everything happening on campus.", rating: 5 },
    { name: "Karan Gupta", department: "MBA, 2nd Year", text: "As a club organizer, the admin panel makes event management a breeze. Registration analytics are super helpful.", rating: 4 },
    { name: "Meera Joshi", department: "Design, 3rd Year", text: "The UI is stunning — better than most professional apps I've used. Really impressed with the attention to detail.", rating: 5 }
  ],

  /* ---- Notifications ---- */
  notifications: [
    { id: 1, type: "event", title: "TechFest 2026 Registration Open", message: "Early bird registration is now live. Secure your spot!", time: "2 hours ago", read: false },
    { id: 2, type: "achievement", title: "New Badge Unlocked!", message: "You've earned the 'Event Explorer' badge for attending 5 events.", time: "1 day ago", read: false },
    { id: 3, type: "reminder", title: "AI/ML Workshop Tomorrow", message: "Don't forget to bring your laptop with Python installed.", time: "2 days ago", read: true },
    { id: 4, type: "certificate", title: "Certificate Ready", message: "Your TechFest 2025 participation certificate is ready for download.", time: "1 week ago", read: true },
    { id: 5, type: "update", title: "Cultural Night Venue Changed", message: "The venue has been moved from Auditorium to Open Air Theatre.", time: "1 week ago", read: true }
  ],

  /* ---- Statistics ---- */
  stats: {
    totalEvents: 45,
    totalStudents: 3200,
    totalClubs: 12,
    eventsThisMonth: 8,
    satisfaction: 96
  },

  /* ---- Admin Analytics ---- */
  adminAnalytics: {
    totalRegistrations: 4520,
    activeUsers: 2800,
    revenue: 185000,
    eventSuccess: 94,
    monthlyRegistrations: [320, 450, 380, 520, 610, 480, 550, 700, 620, 580, 490, 650],
    categoryBreakdown: { Technology: 35, Cultural: 25, Sports: 15, Workshop: 15, Entrepreneurship: 10 },
    recentRegistrations: [
      { user: "Rohan M.", event: "TechFest 2026", time: "5 min ago" },
      { user: "Sneha K.", event: "Cultural Night", time: "12 min ago" },
      { user: "Amit P.", event: "AI/ML Workshop", time: "25 min ago" },
      { user: "Divya R.", event: "Startup Weekend", time: "1 hr ago" },
      { user: "Varun S.", event: "Coding Championship", time: "2 hr ago" }
    ]
  },

  /* ---- Activity Timeline ---- */
  activityTimeline: [
    { type: "registration", text: "Registered for TechFest 2026", time: "Today, 10:30 AM", icon: "📝" },
    { type: "achievement", text: "Earned 'Community Star' badge", time: "Yesterday, 3:15 PM", icon: "⭐" },
    { type: "certificate", text: "Downloaded AI Workshop certificate", time: "May 15, 2026", icon: "📜" },
    { type: "event", text: "Attended Design Thinking Bootcamp", time: "May 10, 2026", icon: "🎯" },
    { type: "profile", text: "Updated profile skills", time: "May 8, 2026", icon: "👤" }
  ]
};

// Make available globally
window.MockData = MockData;
