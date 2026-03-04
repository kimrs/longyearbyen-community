# Authentication Spec

## Demo Behavior

Since this is a wireframe/demo with no backend:

- **Browsing**: Everyone can browse all boards and posts without logging in
- **Posting**: Attempting to post, bid, comment, or use the bot to create a post triggers a login prompt
- **Mock login**: User picks from a list of pre-defined demo users (no real auth)
- **No persistence**: Refreshing the page logs the user out (no cookies/localStorage)

## Mock Users

| Name | Avatar | Description |
|------|--------|-------------|
| Erik Hansen | 👨 | Local resident, sells gear |
| Maja Nordahl | 👩 | Event organizer |
| Lars Svendsen | 🧔 | Frequent poster |
| Ingrid Paulsen | 👩‍🦰 | New to town |

## Production Auth Recommendation

For the real app, the recommended approach is **Vipps Login** (MobilePayByVipps):

### Why Vipps?

- Nearly 100% adoption in Norway — everyone has Vipps
- Built-in identity verification (tied to Norwegian phone number + BankID)
- No anonymity — real names verified
- Simple OAuth2 flow
- Mobile-first (matches our app)
- Low friction — users just approve in the Vipps app

### Why not BankID directly?

- BankID works but is heavier (more steps, feels more "official/bureaucratic")
- Vipps uses BankID under the hood but wraps it in a friendlier UX
- Vipps is more natural for a community app

### Why not email/password?

- Doesn't prevent anonymity
- Doesn't verify real identity
- More friction (forgotten passwords, etc.)

### Login Flow (Production — not implemented in demo)

1. User taps "Logg inn"
2. Redirect to Vipps OAuth
3. User approves in Vipps app
4. Redirect back with verified identity
5. User profile auto-created from Vipps data (name, phone)

## Demo Login Flow

1. User taps "Logg inn" or tries to perform an action requiring auth
2. Modal appears: "Velg en demo-bruker" (Choose a demo user)
3. User picks from the 4 mock users
4. App state updates with selected user
5. User can now post/bid/comment
