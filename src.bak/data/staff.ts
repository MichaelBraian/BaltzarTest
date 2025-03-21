export interface StaffMember {
  id: string;
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: "anna-lindberg",
    name: "Dr. Anna Lindberg",
    title: "Tandläkare, Klinikchef",
    description: "Specialiserad inom estetisk tandvård med över 15 års erfarenhet.",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staff/doctor1.jpg"
  },
  {
    id: "erik-johansson",
    name: "Dr. Erik Johansson",
    title: "Tandläkare, Implantolog",
    description: "Specialiserad på implantatbehandlingar och kirurgiska ingrepp.",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staff/doctor2.jpg"
  },
  {
    id: "maria-andersson",
    name: "Maria Andersson",
    title: "Tandhygienist",
    description: "Expert på förebyggande tandvård och parodontit-behandling.",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staff/hygienist1.jpg"
  },
  // Add more staff members as needed
]; 