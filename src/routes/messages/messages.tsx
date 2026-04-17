import { Container, Heading, Text } from "@medusajs/ui"

export const Messages = () => {
  return (
    <Container className="divide-y p-0 min-h-[700px]">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading>Messages</Heading>
        </div>
      </div>

      <div className="px-6 py-4 h-[655px]">
        <div className="flex flex-col items-center w-full h-full justify-center">
          <Heading>Messages are disabled</Heading>
          <Text className="text-ui-fg-subtle mt-4" size="small">
            TalkJS is currently disabled.
          </Text>
        </div>
      </div>
    </Container>
  )
}
