export interface IMessage {
    fromId?: string
    imageUrl: string
    id: string
    toId: string
    type: MessageType
    theme?: string
    themeSlug?: string
    text: string
    read: boolean
    sendDate?: number
    readDate?: number
    imageUrl?: string
}

export type MessageType = "NONE" | "SYSTEM" | "USER"