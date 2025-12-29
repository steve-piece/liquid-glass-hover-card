"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Users, Calendar } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Image from "next/image"

const userProfileCardVariants = cva(
  "fixed z-50 rounded-xl md:rounded-2xl p-3 md:p-4 pointer-events-none w-fit max-w-[calc(100vw-2rem)] sm:max-w-[320px]",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border border-border shadow-lg",
        glass:
          "bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm backdrop-saturate-125 border border-white/15 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface UserProfileData {
  username: string
  displayName: string
  avatar: string
  bio: string
  followers: number
  joinedDate: string
  isOnline: boolean
}

export interface UserProfileCardProps extends VariantProps<typeof userProfileCardVariants> {
  data: UserProfileData | null
  position: { x: number; y: number }
  show: boolean
  className?: string
}

/**
 * User Profile Hover Card - Liquid Glass Variant
 *
 * Displays user profile information on hover:
 * - Avatar and username
 * - Bio
 * - Followers count
 * - Join date
 * - Message button
 */
export function UserProfileCard({ data, position, show, variant, className }: UserProfileCardProps) {
  if (!data || !show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-slot="user-profile-card"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(userProfileCardVariants({ variant }), className)}
          style={{
            left: typeof window !== "undefined" ? Math.min(position.x + 32, window.innerWidth - 340) : position.x + 32,
            top: Math.max(position.y + 16, 10),
          }}
        >
          {/* User Header with Avatar */}
          <div className="flex items-start gap-3 mb-4 pb-3 border-b border-white/20 dark:border-white/10">
            <div className="relative">
              <Image
                src={data.avatar || "/placeholder.svg"}
                alt={data.displayName}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover bg-slate-200"
              />
              {data.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-green-500 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{data.displayName}</h4>
              <p className="text-xs text-white/70 font-mono truncate">@{data.username}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-3 mb-4">
            <p className="text-xs leading-relaxed text-white/90 line-clamp-3">{data.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-white/20 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <Users className="shrink-0 text-white/70" size={14} />
              <span className="text-xs font-medium text-white">{data.followers.toLocaleString()}</span>
              <span className="text-xs text-white/70">followers</span>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center gap-1.5 mb-4">
            <Calendar className="shrink-0 text-white/70" size={14} />
            <span className="text-xs text-white/90">Joined {data.joinedDate}</span>
          </div>

          {/* Message Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600/40 hover:bg-emerald-600/60 backdrop-blur-sm text-white text-sm font-medium transition-colors pointer-events-auto border border-emerald-400/30">
            <MessageCircle size={16} />
            Send Message
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Hook to manage user profile card state
 */
export function useUserProfileCard(delay = 0) {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [show, setShow] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (event: React.MouseEvent, data: UserProfileData) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setPosition({ x: event.clientX, y: event.clientY })
    setProfileData(data)

    if (delay === 0) {
      setShow(true)
    } else {
      const id = setTimeout(() => {
        setShow(true)
      }, delay)
      setTimeoutId(id)
    }
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setShow(false)
    setProfileData(null)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return {
    profileData,
    position,
    show,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  }
}

export { userProfileCardVariants }
