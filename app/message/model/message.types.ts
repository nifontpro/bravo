export interface IMessage {
	fromId?: string
	toId: string
	type: MessageType
	theme?: string
	themeSlug?: string
	text: string
	read: boolean
	sendDate?: number
	readDate?: number
}

export type MessageType = "NONE" | "SYSTEM" | "USER"