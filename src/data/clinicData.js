export const CLINIC_INFO = {
  name: "dentbites",
  tagline: "Advanced 3D Dentistry & Smile Restoration Center",
  phone: "+92 300 1234567",
  whatsapp: "+923001234567",
  whatsappDisplay: "+92 300 1234567",
  email: "care@dentbites.com",
  address: "Suite 402, Medical Boulevard, Near City Center, Lahore, Pakistan",
  timing: "Monday - Saturday: 09:00 AM - 09:00 PM | Sunday: Emergency Only",
  emergencyPhone: "+92 300 1234567",
  googleRating: 4.9,
  reviewsCount: 480
};

export const SERVICES = [
  {
    id: "implants",
    title: "Dental Implants",
    category: "Restorative",
    description: "Permanent titanium root replacement with custom ceramic crowns that look, feel, and function like natural teeth.",
    image: "/assets/media/services/Dental_Implant.webp",
    duration: "45 - 60 mins",
    painLevel: "Painless (Local Anesthesia)",
    popular: true,
    highlights: ["Lifetime Durability", "Titanium Precision", "Natural Aesthetic & Bite"]
  },
  {
    id: "rct",
    title: "Root Canal Treatment (RCT)",
    category: "Endodontics",
    description: "Advanced rotary endodontic therapy to save severely infected or damaged teeth with zero discomfort.",
    image: "/assets/media/services/RCT.jpg",
    duration: "30 - 45 mins",
    painLevel: "Painless (Single Sitting Available)",
    popular: true,
    highlights: ["Save Natural Tooth", "Modern Rotary Tech", "Instant Pain Relief"]
  },
  {
    id: "aligners",
    title: "Clear Aligners & Braces",
    category: "Orthodontics",
    description: "Discreet transparent aligners and metal/ceramic brackets to straighten crooked teeth and fix bite misalignments.",
    image: "/assets/media/services/aligners.webp",
    duration: "Monthly Checkup",
    painLevel: "Mild Pressure Only",
    popular: true,
    highlights: ["Invisible & Removable", "Custom 3D Digital Plan", "Comfortable Fit"]
  },
  {
    id: "veneers",
    title: "Smile Makeover & Veneers",
    category: "Cosmetics",
    description: "Ultra-thin custom porcelain veneers and laminates crafted to transform tooth color, shape, and symmetry.",
    image: "/assets/media/services/smile-makeover-with-porcelain-veneers.jpg",
    duration: "2 Sittings",
    painLevel: "Zero Discomfort",
    popular: true,
    highlights: ["Hollywood Smile", "Stain Resistant", "Instant Transformation"]
  },
  {
    id: "scaling",
    title: "Ultrasonic Scaling & Polishing",
    category: "Preventive",
    description: "Deep ultrasonic cleaning to eradicate plaque, calculus, and coffee/nicotine stains for fresh breath and pink gums.",
    image: "/assets/media/services/scalling.jpeg",
    duration: "25 - 35 mins",
    painLevel: "Completely Gentle",
    popular: false,
    highlights: ["Gum Disease Prevention", "Sparkling Clean Teeth", "Instant Polish"]
  },
  {
    id: "fillings",
    title: "Composite Dental Fillings",
    category: "Restorative",
    description: "Tooth-colored, UV-light cured composite resin to seamlessly restore cavities and chipped tooth edges.",
    image: "/assets/media/services/Dental_FIllings.webp",
    duration: "20 - 30 mins",
    painLevel: "Zero Pain",
    popular: false,
    highlights: ["Invisible Color Match", "Strong Bond", "Mercury-Free"]
  },
  {
    id: "pediatric",
    title: "Pediatric Gentle Dentistry",
    category: "Kids Care",
    description: "Friendly, compassionate dental care tailored specifically for infants, toddlers, and young teens in a stress-free environment.",
    image: "/assets/media/services/Padiatric.jpeg",
    duration: "20 - 30 mins",
    painLevel: "Fun & Tear-Free",
    popular: false,
    highlights: ["Child Friendly Setup", "Preventive Fluoride", "Habit Correction"]
  },
  {
    id: "extraction",
    title: "Painless Tooth & Wisdom Extraction",
    category: "Oral Surgery",
    description: "Minimally invasive extraction for impacted wisdom teeth, severe decay, or orthodontic alignment requirements.",
    image: "/assets/media/services/Tooth_Extraction.jpeg",
    duration: "30 - 45 mins",
    painLevel: "High-Grade Anesthesia",
    popular: false,
    highlights: ["Rapid Healing Protocol", "Atraumatic Method", "Post-Op Care Guide"]
  }
];

export const DENTISTS = [
  {
    id: "dr-hafeez",
    name: "Dr. Muhammad Hafeez",
    title: "Chief Consultant & Implantologist",
    degrees: "BDS, FCPS (Orthodontics), FICOI (USA)",
    experience: "15+ Years Experience",
    image: "/assets/media/dentists/hafeez.jpg",
    specialty: "Dental Implants, Orthodontics, Clear Aligners & Cosmetic Smile Design",
    bio: "Pioneer in computer-guided 3D implant placement and advanced orthodontics. With over 15 years of clinical mastery and more than 8,000 successful smile restoration cases, Dr. Muhammad Hafeez provides compassionate, painless, world-class dental solutions utilizing state-of-the-art digital dental engineering.",
    availability: "Monday - Saturday: 09:00 AM - 09:00 PM",
    achievements: [
      "Fellow of the International Congress of Oral Implantologists (FICOI, USA)",
      "FCPS Specialized in Orthodontics & Dentofacial Orthopedics",
      "Over 8,000+ Successfully Restored Smiles & Implants",
      "Certified in Computer-Guided 3D Surgical Diagnostics"
    ],
    expertise: [
      "Immediate & Full-Arch Dental Implants",
      "Clear Aligners & Advanced Orthodontics",
      "Painless Single-Sitting Root Canal Therapy",
      "Porcelain Veneers & Complete Smile Makeovers",
      "Ultrasonic Periodontal Scaling & Polishing",
      "Full Mouth Functional Oral Rehabilitation"
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Faseeh Ur Rehman",
    role: "Verified Patient",
    treatment: "Root Canal Treatment",
    rating: 5,
    text: "I was terrified of getting a root canal, but Dr. Muhammad Hafeez made it completely painless in just one sitting! The clinic is spotless, ultra-modern, and the 3D explanation before the procedure gave me full peace of mind.",
    image: "/assets/media/testimonials/FASEEH.jpeg"
  },
  {
    id: 2,
    name: "Sami Ullah",
    role: "Verified Patient",
    treatment: "Clear Aligners",
    rating: 5,
    text: "Swapped metal braces for custom 3D aligners here. Within 6 months my front gap completely vanished. Incredible staff and top-tier hygiene standards.",
    image: "/assets/media/testimonials/sami.jpg"
  },
  {
    id: 3,
    name: "Ayesha Malik",
    role: "Verified Patient",
    treatment: "Porcelain Veneers Smile Makeover",
    rating: 5,
    text: "The smile makeover completely boosted my career confidence! Dr. Muhammad Hafeez designed a smile that looks completely natural, bright, and perfectly balanced. 10/10!",
    image: "/assets/media/testimonials/slide3.jpg"
  },
  {
    id: 4,
    name: "Tariq Mahmood",
    role: "Verified Patient",
    treatment: "Double Dental Implants",
    rating: 5,
    text: "Got two titanium implants installed with 3D surgical guidance. Healing was surprisingly fast with zero complications. The chewing comfort is exactly like my original teeth.",
    image: "/assets/img/testimonial-2.jpg"
  }
];

export const STATS = [
  { label: "Smiles Transformed", value: "15,000+", icon: "Sparkles" },
  { label: "Clinical Success Rate", value: "99.4%", icon: "CheckCircle2" },
  { label: "Years Combined Exp.", value: "25+", icon: "Award" },
  { label: "5-Star Patient Rating", value: "4.9/5", icon: "Star" }
];

export const FAQS = [
  {
    question: "Is modern Root Canal Treatment (RCT) painful?",
    answer: "Not at all. With modern high-precision local anesthesia and computerized rotary endodontics, a root canal feels no different than getting a routine composite filling. Most patients report instant relief from the throbbing pain they arrived with."
  },
  {
    question: "How long do Dental Implants typically last?",
    answer: "Dental implants are designed to be a permanent, lifetime tooth replacement solution. Titanium integrates directly with your jawbone (osseointegration). With regular hygiene and checkups, the implant fixture lasts for life."
  },
  {
    question: "How do Clear Aligners compare to traditional wire braces?",
    answer: "Clear aligners are virtually invisible, removable for eating and brushing, and don't cause ulcers from sharp wires. We plan your entire treatment in advance using 3D digital tooth simulation so you can preview your final smile before starting."
  },
  {
    question: "How can I schedule an urgent or same-day appointment?",
    answer: "You can book directly through our online scheduler on this website or click the floating WhatsApp button to speak with our reception immediately for priority emergency slots."
  },
  {
    question: "What sterilization protocols do you follow?",
    answer: "We strictly adhere to Class-B European Autoclave hospital-grade 5-step sterilization protocols. All instruments are sealed in surgical indicator pouches and opened directly in front of the patient."
  }
];
