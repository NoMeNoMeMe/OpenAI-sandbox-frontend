export interface HistoryItem {
    role: "user" | "assistant" | "system",
    parts: { text: string }[],
    model?: string,
}