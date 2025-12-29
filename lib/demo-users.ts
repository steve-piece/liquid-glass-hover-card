export interface UserProfileData {
  username: string
  displayName: string
  avatar: string
  bio: string
  followers: number
  joinedDate: string
  isOnline: boolean
}

export const DEMO_USER: UserProfileData = {
  username: "username",
  displayName: "Alex Rivera",
  avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  bio: "Product Manager at TechCorp | Building innovative solutions | 10+ years in SaaS | Speaker & Mentor",
  followers: 12543,
  joinedDate: "March 2022",
  isOnline: true,
}
