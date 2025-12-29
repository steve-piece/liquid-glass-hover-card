"use client"

import { UserProfileCard, useUserProfileCard } from "@/components/user-profile-card"
import { DEMO_USER } from "@/lib/demo-users"

export default function Home() {
  const { profileData, position, show, handleMouseEnter, handleMouseLeave, handleMouseMove } = useUserProfileCard(200)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.jpeg')" }}
    >
      <p className="text-white text-base font-medium drop-shadow-md bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
        Hover over{" "}
        <span
          className="text-emerald-400 hover:text-emerald-300 cursor-pointer underline decoration-emerald-400/50 underline-offset-2 font-semibold"
          onMouseEnter={(e) => handleMouseEnter(e, DEMO_USER)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          @{DEMO_USER.username}
        </span>{" "}
        to see the hover card
      </p>

      <UserProfileCard data={profileData} position={position} show={show} variant="glass" />
    </div>
  )
}
