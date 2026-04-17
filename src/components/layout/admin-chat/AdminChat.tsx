import { ChatBubble } from "@medusajs/icons"
import { IconButton } from "@medusajs/ui"

export const AdminChat = () => {
  return (
    <IconButton
      variant="transparent"
      className="text-ui-fg-muted hover:text-ui-fg-subtle"
      disabled
    >
      <ChatBubble />
    </IconButton>
  )
}
