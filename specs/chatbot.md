# Chatbot Spec

## Overview

A simple chat interface that helps users find items and create posts. In the demo, this is entirely client-side with pattern matching (no real AI/RAG).

## Chat Interface

- Full-screen chat view (mobile-optimized)
- Message bubbles (user on right, bot on left)
- Text input at bottom with send button
- Bot has a name: **Svali** (a friendly Arctic-themed name)
- Bot avatar: 🤖 or a simple icon

## Bot Behavior (Demo)

Since there's no real RAG/AI, the bot uses simple keyword matching against the mock data.

### Flow 1: Item Found

1. User types: "Har noen en signalpistol til salgs?"
2. Bot searches mock marketplace data for matching keywords
3. Bot replies: "Jeg fant dette på Torget:" + card preview of "Signalpistol Orion — 1 200 kr"
4. Card is tappable → navigates to the post

### Flow 2: Item Not Found

1. User types: "Jeg leter etter en kajakk"
2. Bot searches mock data, finds nothing
3. Bot replies: "Beklager, jeg fant ingen treff for «kajakk». Vil du at jeg oppretter et «Ønskes kjøpt»-innlegg for deg?"
4. Two buttons: "Ja, opprett innlegg" / "Nei takk"
5. If yes:
   - Bot shows a preview card: "Ønskes kjøpt: Kajakk" with auto-generated description
   - "Ser dette bra ut?" + "Legg ut" / "Rediger" buttons
   - If "Legg ut": Bot confirms "Innlegget er lagt ut på Torget!" (adds to mock data)
   - If "Rediger": show an inline edit form, then preview again

### Flow 3: General/Unrecognized

1. User types anything the bot can't match
2. Bot replies: "Beklager, jeg fant ingen treff for «[input]». Vil du at jeg oppretter et innlegg for deg?"
3. Same flow as Flow 2

### Keyword Matching Logic (Demo)

Simple approach:
- Normalize input (lowercase, strip common words)
- Check if any word matches title/description words in mock marketplace data
- If match score > threshold → show results
- If no match → offer to create post

## Bot Requires Login

- If user is not logged in and tries to create a post via bot → trigger login modal
- Browsing/searching via bot does NOT require login

## Mock Conversation (Pre-loaded)

When entering the bot tab, show a welcome message:

> **Svali**: Hei! 👋 Jeg er Svali, din hjelper for Longyearbyen-samfunnet. Spør meg om noe du leter etter, så sjekker jeg Torget for deg!

## Search Scope

The bot searches across ALL boards, not just marketplace:
- Marketplace posts (primary)
- Events
- Lost & Found
- General board

Results are shown with the board name as context.
