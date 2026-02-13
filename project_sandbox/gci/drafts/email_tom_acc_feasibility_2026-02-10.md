
Justin Headley <justin@sagemindai.io>
Tue, Feb 10, 4:37 PM (16 hours ago)
to Tom, Shalon

Hey Tom,

Good news — I dug into the ACC API and a direct integration is definitely doable. Autodesk actually published a tutorial showing this exact pattern (Custom GPT connecting to ACC via their API), so we're not blazing a new trail here.

What it would look like: I'd add ACC as a second data source to the existing Data Scout GPT. Users would authenticate with Autodesk separately (same kind of login flow as Egnyte), and then they can search both Egnyte files and ACC project data from the same chat window.

What it covers:

RFIs — full keyword search ("find RFIs about structural steel on Project X")
Issues / Punchlist — filter by status, type, assignee, etc.
Submittals — keyword search plus filtering by spec section, status, package
Change Orders / Cost — filter by status, type, contract, and more
What it won't do (being upfront):

Daily logs — Autodesk doesn't have a real-time API for these. No way around it right now.
Reading attachments — It can find an RFI and show you the question/answer text, but if the answer is "see attached PDF," it can't open the PDF. It'll tell you the file name and where to find it.
What I need from your side (~10 min):

Your ACC Account Administrator needs to authorize a connection between ACC and the Data Scout GPT. It's a quick step in the ACC admin panel — I can send over step-by-step instructions for them.
Your ACC account ID (I can help them find it if needed).
A project we can use for testing — ideally one with some RFIs and issues I can validate against.
Effort on my end: Roughly 5-8 hours to build and test. API access is free — no additional Autodesk costs beyond your existing ACC subscription.

I can start on my side right away. Just let me know who to coordinate with on the ACC admin step and which project to use for testing.

Justin




Tom Southam
Tue, Feb 10, 5:33 PM (15 hours ago)
to Jon, me, Shalon

Justin:

This is fantastic news!

Jon West (Copied) should be able to help you out with the ACC admin requirements below. He also knows how excited I am about getting this working ASAP so hopefully we can get you what you need tomorrow so that you can continue to make progress.

Thanks,
 
Tom Southam
​​​​
President
GCI General Contractors
300 California St, 5th Floor
, 
San Francisco
, 
CA
 
94104
T 415 978 2790
 | 
C 408 592 0832
tsoutham@gcigc.com
 | 
gcigc.com
Clickable link to GCI's LinkedIn Page.

From: Justin Headley <justin@sagemindai.io>
Sent: Tuesday, February 10, 2026 4:38 PM
To: Tom Southam <tsoutham@gcigc.com>
Cc: Shalon Ani <sani@gcigc.com>
Subject: ChatGPT - ACC integration

Jon West
Tue, Feb 10, 10:29 PM (11 hours ago)
to Tom, me, Shalon

Justin,

 

This is killer!  Shoot me over the step by step and I’ll make some time tomorrow to get you rolling.  I also have a few projects in mind to run tests on.

 

Thanks,

 

 
Jon West
​​​​
Project Manager
GCI General Contractors
300 California St, 5th Floor
, 
San Francisco
, 
CA
 
94104
T 415 978 2790
 | 
C 408 348 5453
jwest@gcigc.com
 | 
gcigc.com
Clickable link to GCI's LinkedIn Page.

