# Liquid Glass Hover Card

A beautiful, animated hover card component with a frosted glass effect built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Liquid Glass Effect** - Translucent backdrop blur with subtle gradients
- **Smooth Animations** - Framer Motion powered enter/exit transitions
- **Customizable Delay** - Configure hover delay before card appears
- **Responsive** - Adapts to screen edges and mobile viewports
- **Dark Text** - High contrast text for readability
- **Online Status** - Pulsing indicator for user presence

## Usage

```tsx
import { UserProfileCard, useUserProfileCard } from "@/components/user-profile-card"

function MyComponent() {
  const { profileData, position, show, handleMouseEnter, handleMouseLeave, handleMouseMove } = useUserProfileCard(200)

  const user = {
    username: "johndoe",
    displayName: "John Doe",
    avatar: "https://example.com/avatar.png",
    bio: "Software Engineer",
    followers: 1234,
    joinedDate: "January 2024",
    isOnline: true,
  }

  return (
    <>
      <span
        onMouseEnter={(e) => handleMouseEnter(e, user)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        @{user.username}
      </span>

      <UserProfileCard data={profileData} position={position} show={show} variant="glass" />
    </>
  )
}
```

## Props

### UserProfileCard

| Prop | Type | Description |
|------|------|-------------|
| `data` | `UserProfileData \| null` | User profile data to display |
| `position` | `{ x: number, y: number }` | Cursor position for card placement |
| `show` | `boolean` | Whether to show the card |
| `variant` | `"default" \| "glass"` | Card style variant |

### useUserProfileCard

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `delay` | `number` | `0` | Milliseconds to wait before showing card |

## Dependencies

- `framer-motion` - Animations
- `lucide-react` - Icons
- `class-variance-authority` - Variant styling
