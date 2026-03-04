We are doing spec driven development. You will help me create the spec files that we will use to create a TASKS.md that we will use in my ralph loop (run.sh)

We are creating a Phone first webapp that will replace the facebook groups used by the people who lives and frequent Longyearbyen. Requirements:
* A board where people post items for sale or wanted.
    * People are able to bid and as questions on the entries.
    * 5 min rule automatically enforced
* A board for events in Longyearbyen
* A board for lost and found
* A general board

* It will also have a chatbot that uses a RAG that knows every post. A user may ask it "I want to by a signal pistol" It will reply with the item for sale, or if none for sale it will ask if the user want to create a looking for post. 

For now we only need a wireframe. But I need you to fill the app up with mock data such that I am able to show people how it will work. 

Entering the app nullifies the demo. So no cookies. 

Create a github action for posting it on gitup pages.

Create a README that links to the hosted app

* Everyone can browse but you have to be a user to post anything. We do not allow anonymity. You need to help me in how we are going to do that. Do we use Vipps or BankId or anything else for logging in?

If someone asks types anything in the bot, it should just say something like. Sorry, I could not find any signal pistol. Would you like me to create a post asking for it?
And after the reply the bot should give a preview and post it if approved. 

